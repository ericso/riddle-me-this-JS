from rest_framework import serializers

from authentication.serializers import AccountSerializer
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
  """
  """
  # When serializing a Post object, we want to include all of the author's
  #  information. Within Django REST Framework, this is known as a nested
  #  relationship.
  author = AccountSerializer(required=False)

  class Meta:
    model = Post

    fields = (
      'id',
      'author',
      'content',
      'created_at',
      'updated_at',
    )
    read_only_fields = (
      'id',
      'created_at',
      'updated_at',
    )

  def get_validation_exclusions(self, *args, **kwargs):
    """
    """
    # Add author to the list of validations we wish to skip
    exclusions = super(PostSerializer, self).get_validation_exclusions()
    return exclusions + ['author']
