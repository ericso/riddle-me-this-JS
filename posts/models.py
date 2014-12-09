from django.db import models

from authentication.models import Account


class Post(models.Model):
  """Model class for a post (like Twitter or Facebook)
  """
  author = models.ForeignKey(Account)
  content = models.TextField()

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __unicode__(self):
    return '{0}'.format(self.content)

