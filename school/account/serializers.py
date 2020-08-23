from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = fields = ['id', 'username', 'is_teacher', 'is_student', 'first_name', 'last_name', 'email','location', 'bio', "date_joined"]

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('name',)


class StudentRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(validated_data['username'], validated_data['password'],is_student=validated_data['is_student'],
                is_teacher=validated_data['is_teacher'])
        return user

class TeacherRegisterSerializer(serializers.ModelSerializer):
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all(), required=True)
    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'subject')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(validated_data['username'], 
                validated_data['password'],is_student=validated_data['is_student'],
                is_teacher=validated_data['is_teacher'])
        Teacher.objects.create(user = user, interests = validated_data['subject'])
        return user




class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = fields = ['first_name', 'last_name', 'email', 'photo', 'bio']
        extra_kwargs = {'first_name': {'required': False, 'allow_blank': True,},
                        'last_name': {'required': False, 'allow_blank': True,},
                        'email': {'required': False, 'allow_blank': True,},
                        'photo': {'required': False,'allow_null':True},
                        'bio': {'required': False, 'allow_blank': True,}}

class TeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = Teacher
        fields = '__all__'
        depth = 1