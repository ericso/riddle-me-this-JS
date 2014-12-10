from django.db import models

from authentication.models import Account


class Riddle(models.Model):
  """Riddles have four parts:
    1. Question
    2. Hint
    3. Answer
    4. Source
  """
  author = models.ForeignKey(Account)

  question = models.TextField()
  hint = models.TextField()
  answer = models.TextField()
  source = models.TextField()

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __unicode__(self):
    return '{0}'.format(self.question)
