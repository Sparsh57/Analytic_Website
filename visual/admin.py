from django.contrib import admin
from .models import MstVideo, MstFace

# Defining a custom admin class for MstVideo model
class MstVideoAdmin(admin.ModelAdmin):
    # Specifying the fields to display in the admin list view
    list_display = ('project_id', 'video_id', 'video_path', 'video_fps', 'status', 'created_at', 'start_time')

# Defining a custom admin class for MstFace model
class MstFaceAdmin(admin.ModelAdmin):
    # Specifying the fields to display in the admin list view
    list_display = ('project_id', 'video_foreign', 'face_id', 'template', 'template_size', 'gender', 'age', 'face_time', 'created_at')

# Registering the MstVideo model with its custom admin class
admin.site.register(MstVideo, MstVideoAdmin)
# Registering the MstFace model with its custom admin class
admin.site.register(MstFace, MstFaceAdmin)
