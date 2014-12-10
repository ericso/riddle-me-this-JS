from rest_framework import permissions, viewsets
from rest_framework.response import Response

from posts.models import Post
from posts.permissions import IsAuthorOfPost
from posts.serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
  queryset = Post.objects.order_by('-created_at')
  serializer_class = PostSerializer

  def get_permissions(self):
    """If the HTTP method is safe, we allow anyone to access this view.
      Otherwise, make sure they are authenticated and author of the post.
    """
    if self.request.method in permissions.SAFE_METHODS:
      return (permissions.AllowAny(),)
    return (permissions.IsAuthenticated(), IsAuthorOfPost(),)

  def perform_create(self, serializer):
    """Called before the model of this view is saved.

    When a Post object is created it has to be associated with an author.
    """
    instance = serializer.save(author=self.request.user)

    return super(PostViewSet, self).perform_create(serializer)


class AccountPostsViewSet(viewsets.ViewSet):
  """This viewset will be used to list the posts associated with a
      specific Account.
  """
  queryset = Post.objects.select_related('author').all()
  serializer_class = PostSerializer

  def list(self, request, account_username=None):
    queryset = self.queryset.filter(author__username=account_username)
    serializer = self.serializer_class(queryset, many=True)

    return Response(serializer.data)
