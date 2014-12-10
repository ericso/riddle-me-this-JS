from rest_framework import permissions


class IsAuthorOfRiddle(permissions.BasePermission):
  def has_object_permission(self, request, view, riddle):
    if request.user:
      return riddle.author == request.user
    return False
