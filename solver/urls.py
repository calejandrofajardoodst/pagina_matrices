from django.urls import path

from . import views

app_name = "solver"

urlpatterns = [
    path("", views.index, name="index"),
    path("api/solve/", views.solve_view, name="solve"),
    path("health/", views.health, name="health"),
]
