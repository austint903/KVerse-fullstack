from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, WordBankSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, WordBank
from rest_framework.response import Response
from rest_framework.views import APIView
import requests

#views handles the logic for incoming requests from the frontned
class NoteListCreate(generics.ListCreateAPIView): #list create will list all notes and create a note
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
        user=self.request.user #gets user that is authenticated and interacting with this route
        return Note.objects.filter(author=user) #filters by author=user, only view notes by you
    
    
    def perform_create(self, serializer):
        if serializer.is_valid(): #manually chekcing if serializer is valid
            serializer.save(author=self.request.user) #if true, then we save serailizer and make new version of note
            #we pass author bc we speicficd authro is read only
        else:
            print(serializer.errors)
            
class NoteDelete(generics.DestroyAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
        user=self.request.user
        return Note.objects.filter(author=user)

    
class WordBankListCreate(generics.ListCreateAPIView):
    serializer_class=WordBankSerializer
    permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return WordBank.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
        
class WordBankDelete(generics.DestroyAPIView):
    serializer_class = WordBankSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return WordBank.objects.filter(author=user)
    
    
class CreateUserView(generics.CreateAPIView): #generics handles createing a new user
    queryset=User.objects.all() #makes sure we dont create duplicate users
    serializer_class=UserSerializer #serailzier class tells us what data we need to make a new user
    permission_classes=[AllowAny] #anyone can create a newuser view
    


class ChatWithOllamaView(APIView):
    permission_classes=[IsAuthenticated]
    
    def post(self,request, *args, **kwargs):
        user_message=request.data.get("message")
        if not user_message:
            return Response({"error: No message provided."}, status=400)
        
        ollama_api_url = "http://localhost:11434/api/chat"
        
        headers={
            "Content-Type":"application/json",
        }
        
        payload={
            "model": "llama3.2",
            "prompt":user_message,
        }
        try:
            ollama_response = requests.post(ollama_api_url, json=payload, headers=headers)
            ollama_response.raise_for_status()
            
            ai_reply = ollama_response.json()  
        except requests.RequestException as e:
            return Response({"error": str(e)}, status=500)

        return Response({"reply": ai_reply}, status=200)
    
    
    
