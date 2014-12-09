from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager


class AccountManager(BaseUserManager):
  """When substituting a customer user model, it is required that you also define a related Manager class the overrides the create_user() and create_superuser() methods.
  """
  def create_user(self, email, password=None, **kwargs):
    if not email:
      raise ValueError("Users must have a valid email address.")

    if not kwargs.get('username'):
      raise ValueError("Users mus have a valid username.")

    # self.model refers to the model attribute of BaseUserManager
    # This defaults to settings.AUTH_USER_MODEL
    # To start using Account as our authentication model
    #  we have to update settings.AUTH_USER_MODEL to authentication.Account
    account = self.model(
      email=self.normalize_email(email),
      username=kwargs.get('username')
    )
    account.set_password(password)
    account.save()

    return account

  def create_superuser(self, email, password, **kwargs):
    account = self.create_user(email, password, **kwargs)

    account.is_admin = True
    account.save()

    return account


class Account(AbstractBaseUser):
  """User inherits from AbstractBaseUser. That is where User gets most of it's functionality. By creating a new model called Account and inheriting from AbstractBaseUser, we will get the necessary functionality of User (password hashing, session management, etc) and be able to extend Account to include extra information, such as a tagline.
  """
  email = models.EmailField(unique=True)
  username = models.CharField(max_length=40, unique=True)

  first_name = models.CharField(max_length=40, blank=True)
  last_name = models.CharField(max_length=40, blank=True)
  tagline = models.CharField(max_length=140, blank=True)

  is_admin = models.BooleanField(default=False)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  objects = AccountManager()

  # Django's built-in User requires a username.
  # That username is used for logging the user in.
  # By contrast, our application will use the user's
  #  email address for this purpose.
  USERNAME_FIELD = 'email'

  # Normally the 'required=True' argument would accomplish this goal,
  #  but because this model is replacing the User model, Django
  #  requires us to specify required fields in this way.
  REQUIRED_FIELDS = ['username']


  def __unicode__(self):
    """Returns the string representation of an account
    """
    return self.email

  def get_full_name(self):
    return ' '.join([self.first_name, self.last_name])

  def get_short_name(self):
    return self.first_name

