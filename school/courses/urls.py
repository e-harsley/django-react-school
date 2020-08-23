from rest_framework import routers
from .api import *

router = routers.DefaultRouter()
router.register('api/courses', CourseViewSet, 'course')
router.register('api/teachers', TeacherViewset, 'teacher')

urlpatterns = router.urls