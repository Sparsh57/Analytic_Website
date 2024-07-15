from django.core.management.base import BaseCommand
from visual.models import MstFace, MstVideo

class Command(BaseCommand):
    help = 'Update video field of MstFace based on matching video_foreign and video_id of MstVideo'

    def handle(self, *args, **kwargs):
        faces = MstFace.objects.all()
        updated_count = 0
        for face in faces:
            try:
                matching_video = MstVideo.objects.get(video_id=face.video_foreign)
                face.video = matching_video
                face.save()
                updated_count += 1
            except MstVideo.DoesNotExist:
                self.stdout.write(self.style.WARNING(f'No matching video found for video_foreign: {face.video_foreign}'))

        self.stdout.write(self.style.SUCCESS(f'Successfully updated {updated_count} MstFace records.'))
