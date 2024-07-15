from django.db import models
from re import findall
from dateutil.parser import parse
# Defining the MstVideo model
class MstVideo(models.Model):
    # Defining the fields for the model
    project_id = models.TextField(unique=True)  # Unique identifier for the project
    video_id = models.TextField(unique=True)  # Unique identifier for the video
    video_path = models.TextField()  # Path to the video file
    video_fps = models.IntegerField(blank=True, null=True)  # Frames per second of the video, can be null or blank
    status = models.TextField(blank=True, null=True)  # Status of the video, can be null or blank
    created_at = models.DateTimeField()  # Timestamp of when the record was created
    start_time = models.DateTimeField(blank=True, null=True)  # Start time of the video, can be null or blank

    # String representation of the model
    def __str__(self):
        return f"Project ID: {self.project_id} - Video ID: {self.video_id}"

    # Method to populate new columns based on the video path
    def populate_new_columns(self, video_path):
        split_path = video_path.split("\\")[-1]  # Splitting the video path to get the filename
        video_path = findall(r'\d+\.\d+|\d+', split_path)  # Extracting numbers from the filename using regex
        desired_length = 14  # Desired length of the extracted path
        # Filtering paths to find the one with the desired length
        filtered_paths = [path for path in video_path if len(path) == desired_length][0]
        # Parsing the filtered path to get the start time
        res = parse(filtered_paths, fuzzy=True)
        self.start_time = res  # Setting the start time

    # Meta class to specify additional options for the model
    class Meta:
        managed = False  # Specifies that Django should not manage the database table's lifecycle
        db_table = 'mst_video'  # Name of the database table

# Defining the MstFace model
class MstFace(models.Model):
    # Defining the fields for the model
    project_id = models.TextField()  # Identifier for the project
    video_foreign = models.TextField()  # Foreign key reference to the video (as text)
    face_id = models.TextField()  # Identifier for the face
    template = models.BinaryField()  # Binary field for storing the face template
    template_size = models.IntegerField()  # Size of the face template
    gender = models.TextField()  # Gender of the person
    age = models.TextField()  # Age of the person
    face_time = models.TextField()  # Time when the face was detected
    created_at = models.DateTimeField()  # Timestamp of when the record was created
    video = models.ForeignKey('MstVideo', models.CASCADE, blank=True, null=True)  # Foreign key to MstVideo model

    # Method to get the creation datetime
    def get_datetime(self):
        return self.created_at

    # Meta class to specify additional options for the model
    class Meta:
        managed = False  # Specifies that Django should not manage the database table's lifecycle
        db_table = 'mst_face'  # Name of the database table