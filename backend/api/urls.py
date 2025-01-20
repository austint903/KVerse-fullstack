from django.urls import path
from . import views
from .views import ChatWithOllamaView
#url routes rqeuest from frontned
urlpatterns=[
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("chat/", ChatWithOllamaView.as_view(), name="chat-with-ollama"),
    path("wordbank/", views.WordBankListCreate.as_view(), name="wordbank-list-create"),
    path("wordbank/delete/<int:pk>/", views.WordBankDelete.as_view(), name="wordbank-delete"),
]