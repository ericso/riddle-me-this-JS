from rest_framework import permissions, viewsets
from rest_framework.response import Response

from riddles.models import Riddle
from riddles.permissions import IsAuthorOfRiddle
from riddles.serializers import RiddleSerializer


class RiddleViewSet(viewsets.ModelViewSet):
  queryset = Riddle.objects.order_by('-created_at')
  serializer_class = RiddleSerializer

  def get_permissions(self):
    """If the HTTP method is safe, we allow anyone to access this view.
      Otherwise, make sure they are authenticated and author of the post.
    """
    if self.request.method in permissions.SAFE_METHODS:
      return (permissions.AllowAny(),)
    return (permissions.IsAuthenticated(), IsAuthorOfRiddle(),)

  # def perform_create(self, serializer):
  #   """Called before the model of this view is saved.

  #   When a Riddle object is created it has to be associated with an author.
  #   """
  #   instance = serializer.save(author=self.request.user)

  #   return super(RiddleViewSet, self).perform_create(serializer)

  def pre_save(self, obj):
    """pre_save is called before the model of this view is saved
    """
    obj.author = self.request.user

    return super(RiddleViewSet, self).pre_save(obj)

class AccountRiddlesViewSet(viewsets.ViewSet):
  """This viewset will be used to list the riddles associated with a
      specific Account.
  """
  queryset = Riddle.objects.select_related('author').all()
  serializer_class = RiddleSerializer

  def list(self, request, account_username=None):
    queryset = self.queryset.filter(author__username=account_username)
    serializer = self.serializer_class(queryset, many=True)

    return Response(serializer.data)
