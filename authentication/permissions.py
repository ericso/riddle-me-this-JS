from rest_framework import permissions


class IsAccountOwner(permissions.BasePermission):
  """If there is a user associated with the current request, we check whether that user is the same object as account
  """
  def has_object_permission(self, request, view, account):
    if request.user:
      return account == request.user
    return False
