from django.db import models
from django.contrib.auth.models import User

class Note(models.Model): #define pytjon version of model
    title=models.CharField(max_length=100)
    content=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True) #automactically add date when we make a new note
    author=models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    #foreignkey links users with data that belongs to users
    #here, we link the kye with the user so when we delete, we delete everything associated with user
    #just know foreignkey links data with user
    
    
    def __str__ (self):
        return self.title

class WordBank(models.Model):
    author=models.ForeignKey(User, on_delete=models.CASCADE, related_name="wordbank", null=True)
    korean_word=models.CharField(max_length=100)
    english_word=models.CharField(max_length=100)
    song=models.CharField(max_length=200, blank=True, null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__ (self):
        return f"{self.korean_word} - {self.english_word}"


    
