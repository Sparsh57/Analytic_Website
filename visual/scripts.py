from visual.models import MstVideo
vid = MstVideo()
objects = vid.objects.values_list("video_path")
for video in objects:
    MstVideo.populate_new_columns(video)
    MstVideo.save()