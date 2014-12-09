from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from authentication.models import Account


class AccountSerializer(serializers.ModelSerializer):
  """
  """
  password = serializers.CharField(source='password', write_only=True, required=False)
  confirm_password = serializers.CharField(write_only=True, required=False)

  class Meta:
    model = Account

    # The fields attribute of the Meta class is where we specify which attributes of the Account model should be serialized. We must be careful when specifying which fields to serialize because some fields, like is_superuser, should not be available to the client for security reasons.
    fields = (
      'id',
      'email',
      'username',
      'created_at',
      'updated_at',
      'first_name',
      'last_name',
      'tagline',
      'password',
      'confirm_password',
    )
    read_only_fields = (
      'created_at',
      'updated_at',
    )

  def restore_object(self, attrs, instance=None):
    """
    """
    if instance is not None:
      instance.username = attrs.get('username', instance.username)
      instance.tagline = attrs.get('tagline', instance.tagline)

      password = attrs.get('password', None)
      confirm_password = attrs.get('confirm_password', None)

      if password and confirm_password and password == confirm_password:
        instance.set_password(password)
        instance.save()

        # When a user's password is updated, their session authentication hash must be explicitly updated. If we don't do this here, the user will not be authenticated on their next request and will have to log in again.
        update_session_auth_hash(self.context.get('request'), instance)

      return instance
    return Account(**attrs)
