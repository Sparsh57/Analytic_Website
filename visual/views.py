from django.shortcuts import render
from .models import MstFace
import pandas as pd
import datetime
import plotly.graph_objs as go
import plotly.express as px
from plotly.subplots import make_subplots
from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.db.models import Count
from django.db.models.functions import TruncDate

# Home view that requires user login
@login_required(login_url='login')
def home(request):
    mst = MstFace.objects.select_related('video').all()  # Querying all MstFace objects with related video objects
    
    # Extracting start times of videos related to the MstFace objects
    data = [mst_face.video.start_time for mst_face in mst if mst_face.video is not None]
    
    # Creating a DataFrame from the extracted data
    df = pd.DataFrame(data, columns=['start_time'])
    df['start_time'] = pd.to_datetime(df['start_time'])  # Converting start_time to datetime
    df['date'] = df['start_time'].dt.date  # Extracting date from start_time
    df['day'] = df['start_time'].dt.day_name()  # Extracting day name from start_time
    df['hour'] = df['start_time'].dt.hour  # Extracting hour from start_time
    footfall_data = df.groupby(['date', 'hour']).size()  # Grouping data by date and hour to count occurrences
    dates = sorted(list(set(df['date'])))  # Extracting unique dates and sorting them
    hours = sorted(list(set(df['hour'])))  # Extracting unique hours and sorting them
    # Creating a list of footfall data with zero values for missing date-hour combinations
    z_values = [footfall_data.loc[date, hour] if (date, hour) in footfall_data.index else 0 for date in dates for hour in hours]
    data = list(gender_date().iloc[:, 2])  # Extracting gender date data
    gender_age = list(genderage().iloc[:, 3])  # Extracting gender-age data
    ages = list(age().iloc[:, 2])  # Extracting age data
    hourage = list(hour_age().iloc[:, 3])  # Extracting hour-age data
    hourgender = list(hour_gender().iloc[:, 3])  # Extracting hour-gender data
    # Rendering the footfall.html template with the extracted data
    return render(request, 'footfall.html', {
        'dates': sorted(list(set(df['start_time'].dt.strftime("%d-%B")))),
        'hours': list(datetime.datetime.strftime(datetime.datetime.strptime(str(i), "%H"), "%I %p") for i in sorted(list(set(df['hour'])))),
        'footfall_data': z_values,
        "data": data,
        "gender_age": gender_age,
        "age": ages,
        "hour_age": hourage,
        "hour_gender": hourgender
    })

# Function to get gender data by date
def gender_date():
    mst_data = MstFace.objects.annotate(date=TruncDate('video__start_time')).values('gender', 'date').annotate(count=Count('id'))
    mst_data = mst_data.exclude(gender='unknown')  # Excluding unknown genders
    df = pd.DataFrame(list(mst_data))
    df['date'] = pd.to_datetime(df['date'])
    df['date'] = df['date'].dt.strftime('%d-%B')
    return df

# Function to get gender and age data
def genderage():
    mst_data = MstFace.objects.exclude(age=0).values('video__start_time', 'gender', 'age')
    df = pd.DataFrame(list(mst_data))
    df['age'] = df['age'].astype(int)
    df['video__start_time'] = pd.to_datetime(df['video__start_time'])
    bins = [15, 25, 35, 45, 55, 65, 75]
    labels = ['15-25', '26-35', '36-45', '46-55', '56-65', '66-75']
    df['age_group'] = pd.cut(df['age'], bins=bins, labels=labels, right=False)
    df['date'] = df['video__start_time'].dt.strftime('%d-%B')
    chart_data = df.groupby(['date', 'gender', 'age_group']).size().reset_index(name='count')
    return chart_data

# Function to get person time data
def person_time():
    mst = MstFace.objects.all()
    person = [mst_face.gender for mst_face in mst]
    df = pd.DataFrame(data, columns=['created_at'])
    df['created_at'] = pd.to_datetime(df['created_at'])
    df['hour'] = df['created_at'].dt.hours
    footfall_data = df.groupby(['hour']).size()
    barchart = px.bar(footfall_data)
    bar_rep = barchart.to_html(full_html=False, default_height=500, default_width=1500)
    return bar_rep

# Function to get age data
def age():
    mst_data = MstFace.objects.exclude(age=0).values('video__start_time', 'age')
    df = pd.DataFrame(list(mst_data))
    df['age'] = df['age'].astype(int)
    df['video__start_time'] = pd.to_datetime(df['video__start_time'])
    bins = [15, 25, 35, 45, 55, 65, 75]
    labels = ['15-25', '26-35', '36-45', '46-55', '56-65', '66-75']
    df['age_group'] = pd.cut(df['age'], bins=bins, labels=labels, right=False)
    df['date'] = df['video__start_time'].dt.strftime('%d-%B')
    chart_data = df.groupby(['date', 'age_group']).size().reset_index(name='count')
    return chart_data

# Function to get hour and age data
def hour_age():
    mst_data = MstFace.objects.exclude(age=0).values('video__start_time', 'age')
    df = pd.DataFrame(list(mst_data))
    df['age'] = df['age'].astype(int)
    df['video__start_time'] = pd.to_datetime(df['video__start_time'])
    df['date'] = df['video__start_time'].dt.strftime('%d-%B')
    df['hour'] = df['video__start_time'].dt.hour
    bins = [15, 25, 35, 45, 55, 65, 75]
    labels = ['15-25', '26-35', '36-45', '46-55', '56-65', '66-75']
    df['age_group'] = pd.cut(df['age'], bins=bins, labels=labels, right=False)
    chart_data = df.groupby(['date', 'hour', 'age_group']).size().reset_index(name='count')
    return chart_data

# Function to get hour and gender data
def hour_gender():
    mst_data = MstFace.objects.exclude(gender='unknown').values('video__start_time', 'gender')
    df = pd.DataFrame(list(mst_data))
    df['video__start_time'] = pd.to_datetime(df['video__start_time'])
    df['date'] = df['video__start_time'].dt.strftime('%d-%B')
    df['hour'] = df['video__start_time'].dt.hour
    chart_data = df.groupby(['date', 'hour', 'gender']).size().reset_index(name='count')
    all_dates = df['date'].unique()
    all_hours = df['hour'].unique()
    all_genders = (df['gender'].unique())[::-1]
    multi_index = pd.MultiIndex.from_product([all_dates, all_hours, all_genders], names=['date', 'hour', 'gender'])
    chart_data = chart_data.set_index(['date', 'hour', 'gender']).reindex(multi_index, fill_value=0).reset_index()
    chart_data = chart_data.sort_values(by=['date', 'hour'])
    return chart_data

# View for the signup page
def SignupPage(request):
    if request.method == 'POST':
        uname = request.POST.get('username')
        email = request.POST.get('email')
        pass1 = request.POST.get('password1')
        pass2 = request.POST.get('password2')
        if pass1 != pass2:
            return HttpResponse("Your password and confirm password are not the same!!")
        else:
            my_user = User.objects.create_user(uname, email, pass1)
            my_user.save()
            user = authenticate(request, username=uname, password=pass1)
            if user is not None:
                login(request, user)
                request.session['user'] = uname
                return redirect('home')
            else:
                return HttpResponse("User authentication failed after signup.")
    return render(request, 'signup.html')

# View for the login page
def LoginPage(request):
    if 'user' in request.session:
        return redirect('home')
    if request.method == 'POST':
        username = request.POST.get('username')
        pass1 = request.POST.get('pass')
        user = authenticate(request, username=username, password=pass1)
        if user is not None:
            login(request, user)
            request.session['user'] = username
            return redirect('home')
        else:
            return HttpResponse("Username or Password is incorrect!!!")
    return render(request, 'login.html')

# View for the logout page
def LogoutPage(request):
    if 'user' in request.session:
        del request.session['user']
    logout(request)
    return redirect('/')