from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from riddle_me_this.views import IndexView

from rest_framework_nested import routers

from authentication.views import AccountViewSet, LoginView, LogoutView
from posts.views import AccountPostsViewSet, PostViewSet


router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)

# accounts_router provides the nested routing need to access the posts
#  for a specific Account
accounts_router = routers.NestedSimpleRouter(
  router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)


urlpatterns = patterns(
    '',
    # url('^.*$', IndexView.as_view(), name='index'),

    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^', TemplateView.as_view(template_name='index.html')),
)
