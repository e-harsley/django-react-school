from courses.models import *
from rest_framework import viewsets, permissions, status
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from account.models import Teacher, Subject

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    lookup_field = 'id'
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.teacher.course.all()

    def perform_create(self, serializer):
        user = self.request.user
        teacher_id = Teacher.objects.get(user = user)
        serializer.save(teacher=teacher_id)

    @action(detail=True, methods=['GET'])
    def modules(self, request, id=None):
        course = self.get_object()
        modules = Modules.objects.filter(course = course)
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data, status=200)

    @action(detail=True, methods=['POST'])
    def module(self, request, id=None):
        course = self.get_object()
        data =request.data
        data["course"] = course.id
        serializer = ModuleSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    @action(detail=True, methods=['GET'], url_path='module/(?P<module_id>[^/.]+)')
    def get_module(self, request, module_id, id=None):
        course = self.get_object()
        modules = Modules.objects.filter(course = course)
        module = get_object_or_404(modules, pk=module_id)
        serializer = ModuleSerializer(module)
        return Response(serializer.data, status=200)

    @action(detail=True, methods=['PATCH'], url_path='module/update/(?P<module_id>[^/.]+)')
    def update_module(self, request, module_id, id=None):
        course = self.get_object()
        modules = Modules.objects.filter(course = course)
        # module = get_object_or_404(modules, pk=module_id)
        data =request.data
        instance = get_object_or_404(modules, pk=module_id)
        data["course"] = course.id
        serializer = ModuleSerializer(instance, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    @action(detail=True, methods=['DELETE'], url_path='module/delete/(?P<module_id>[^/.]+)')
    def update_delete(self, request, module_id, id=None):
        course = self.get_object()
        modules = Modules.objects.filter(course = course)
        module = get_object_or_404(modules, pk=module_id)
        module.delete()
        return Response(status=204)
    

class TeacherViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class = SubjectSerializer
    lookup_field = 'id'
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return Subject.objects.all()

    @action(detail=True, methods=['GET'])
    def teacher(self, request, id=None):
        subject = self.get_object()
        teacher = Teacher.objects.filter(interests= subject)
        serializer = TeacherSerializer(teacher, many= True)
        return Response(serializer.data, status=200)

    @action(detail=True, methods=['GET'], url_path='teacher/(?P<teacher_id>[^/.]+)')
    def get_teacher(self, request, teacher_id, id=None):
        subject = self.get_object()
        teacher = Teacher.objects.filter(interests= subject)
        teacher = get_object_or_404(teacher, pk=teacher_id)
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data, status=200)