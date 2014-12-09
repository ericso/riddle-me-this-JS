import json

from django.contrib.auth import authenticate, login, logout

from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response

from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
  """ModelViewSet offers an interface for listing, creating, retrieving, updating and destroying objects of a given model.
  """
  # we will use the username attribute of the Account model to look up accounts instead of the id attribute
  lookup_field = 'username'
  queryset = Account.objects.all()
  serializer_class = AccountSerializer

  def get_permissions(self):
    """The only user that should be able to call dangerous methods (such as update() and delete()) is the owner of the account.
    """
    if self.request.method in permissions.SAFE_METHODS:
      return (permissions.AllowAny(),)

    if self.request.method == 'POST':
      # We want to allow any user to create an account. DO NOT put restrictions on POST.
      return (permissions.AllowAny(),)

    return (permissions.IsAuthenticated(), IsAccountOwner(),)


  def create(self, request):
    serializer = self.serializer_class(data=request.DATA)

    if serializer.is_valid():
      account = Account.objects.create_user(**request.DATA)

      account.set_password(request.DATA.get('password'))
      account.save()

      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({
      'status': 'Bad request',
      'message': 'Account could not be created with received data.',
    }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
  """Django REST Framework's views.APIView are made specifically to handle AJAX requests
  """
  def post(self, request, format=None):
    """Unlike generic views, we must handle each HTTP verb ourselves. Logging in should typically be a POST request, so we override the self.post() method.
    """
    data = json.loads(request.body)

    email = data.get('email', None)
    password = data.get('password', None)

    # authenticate() takes an email and a password. Django then checks the database for an Account with email email. If one is found, Django will try to verify the given password. If the username and password are correct, the Account found by authenticate() is returned. If either of these steps fail, authenticate() will return None
    account = authenticate(email=email, password=password)
    if account is not None:
      if account.is_active:
        # If authenticate() is successful and the user is active, then we use Django's login() utility to create a new session for this user.
        login(request, account)

        # We want to store some information about this user in the browser if the login request succeeds, so we serialize the Account object found by authenticate() and return the resulting JSON as the response.
        serialized = AccountSerializer(account)
        return Response(serialized.data)
      else:
        return Response({
          'status': 'Unauthorized',
          'message': 'This account has been disabled.',
        }, status=status.HTTP_401_UNAUTHORIZED)
    else:
      return Response({
        'status': 'Unauthorized',
        'message': 'Username/password combination invalid.',
      }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
  """
  """
  # Only authenticated users should be able to hit this endpoint.
  # Django REST Framework's permissions.IsAuthenticated handles this for us.
  # If the user is not authenticated, they will get a 403 error.
  permission_classes = (permissions.IsAuthenticated,)

  def post(self, request, format=None):
    logout(request)

    return Response({}, status=status.HTTP_204_NO_CONTENT)
