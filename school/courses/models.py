from django.db import models
from account.models import Teacher
# from ckeditor.fields import RichTextField
from django.utils.text import slugify

# Create your models here.
class Course(models.Model):
    teacher = models.ForeignKey(Teacher,related_name="course", on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=200, blank=True)
    overview = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Course, self).save(*args, **kwargs)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return self.title

    @property
    def modules(self):
        return self.modules_set.all()

class Modules(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    slug = models.SlugField(max_length=200, blank=True)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Modules, self).save(*args, **kwargs)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return self.title