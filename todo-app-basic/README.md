Core Concepts and Why They Are Used in This Project
This Django + JavaScript-based To-Do List API project follows the RESTful API architecture using Django REST Framework (DRF). Here’s an explanation of the key concepts used and why they are important:

# 1. Backend (Django & Django REST Framework)
###(A) Views
APIView (from rest_framework.views)
Used for handling API requests in class-based views.
Helps manage HTTP methods like GET, POST, PATCH, DELETE.
Provides built-in authentication, permission handling, and response formatting.
📌 Why?
APIView makes it easy to define endpoints in a structured manner, allowing clean request handling.

### get_object_or_404(Task, pk=pk)
Retrieves a Task object by primary key (pk).
If the object doesn’t exist, it returns a 404 Not Found response instead of an error.
📌 Why?
Prevents the application from crashing when a non-existing task is accessed, improving user experience.

###Response(serializer.data, status=status.HTTP_201_CREATED)
Response returns JSON-formatted data.
status.HTTP_201_CREATED ensures correct HTTP response codes.
📌 Why?
Returns API responses in a standard JSON format, allowing the frontend to process them correctly.

###(B) Models
Task(models.Model)
Defines the Task model with fields:
title: A string representing the task name.
completed: A boolean indicating whether the task is done.
created_at: Stores the timestamp when the task was created.
📌 Why?
Defines the structure of database entries and allows easy management of tasks.

###(C) Serializers
TaskSerializer(serializers.ModelSerializer)
Converts Task model instances into JSON format.
Allows automatic field mapping (fields = '__all__').
📌 Why?
Enables Django to easily convert database objects to JSON and vice versa.

###(D) URL Patterns (Not provided, but implied)
The project likely includes a urls.py file with API routes like:
sql
Copy code
/api/tasks/ (GET) → Fetch all tasks
/api/tasks/create/ (POST) → Add a new task
/api/tasks/update/<id>/ (PATCH) → Update a task
/api/tasks/delete/<id>/ (DELETE) → Delete a task
📌 Why?
Defines the API endpoints, making them accessible to the frontend.
