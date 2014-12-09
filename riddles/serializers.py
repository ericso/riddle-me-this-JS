from rest_framework import serializers

from authentication.serializers import AccountSerializer
from riddles.models import Riddle


class RiddleSerializer(serializers.ModelSerializer):
  author = AccountSerializer(read_only=True, required=False)

  class Meta:
    model = Riddle

    fields = (
      'id',
      'author',
      'question',
      'hint',
      'answer',
      'source',
      'created_at',
      'updated_at',
    )
    read_only_fields = (
      'id',
      'created_at',
      'updated_at',
    )

  def get_validation_exclusions(self, *args, **kwargs):
    """Returns a list of fields we wish to skip
    """
    # Add author to the list of validations we wish to skip
    exclusions = super(RiddleSerializer, self).get_validation_exclusions()

    return exclusions + ['author']
