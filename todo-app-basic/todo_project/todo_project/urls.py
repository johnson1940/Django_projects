"""
URL configuration for todo_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from todo.views import TaskCreateView, TaskDeleteView, TaskListView, TaskUpdateView, index

urlpatterns = [
    path('api/tasks/', TaskListView.as_view(), name='task-list'),      
    path('api/tasks/create/', TaskCreateView.as_view(), name='task-create'),  
    path('api/tasks/update/<int:pk>/', TaskUpdateView.as_view(), name='task-update'),  
    path('api/tasks/delete/<int:pk>/', TaskDeleteView.as_view(), name='task-delete'),  
    path('', index, name='index'),  # UI R
]
