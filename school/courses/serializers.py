from rest_framework import serializers
from .models import *
from account.models import Subject, Teacher, CustomUser

class CourseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Course
        fields = '__all__'
        depth = 2

class ModuleSerializer(serializers.ModelSerializer):

    class Meta:
        model =  Modules
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = "__all__"
        depth = 3

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = fields = ['id', 'username', 'first_name', 'last_name', 'email','location', 'bio', "date_joined"]

class ModuleSerializerList(serializers.ModelSerializer):

    class Meta:
        model = Modules
        fields = '__all__'
        depth = 2

class CourseSerializerList(serializers.ModelSerializer):
    modules = ModuleSerializerList(many= True)
    class Meta:
        model = Course
        fields = ('id','title', 'overview', 'modules')
        depth = 4

class TeacherSerializer(serializers.ModelSerializer):
    user = UserListSerializer()
    course = CourseSerializerList(many= True)

    class Meta:
        model = Teacher
        fields = ('user', 'interests', 'course')
        depth = 3





