from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter

from normandy.recipes.api.views import ActionImplementationView, ActionViewSet, RecipeViewSet

# API Router
router = DefaultRouter()
router.register(r'action', ActionViewSet)
router.register(r'recipe', RecipeViewSet)


app_name = 'recipes'

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(
        r'^api/v1/action/(?P<name>[_\-\w]+)/implementation/(?P<impl_hash>[0-9a-f]{40})/$',
        ActionImplementationView.as_view(),
        name='action-implementation'
    ),
]