from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, WordBank

#serailizers take python objects convert to json data or vice vesera

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","username","password"]
        extra_kwargs = {"password": {"write_only":True}} #password only used as input and will not return anything
        #once all checks, it passes to create function
    def create(self, validated_data): #craetes new version of user, passed all checks of serailizer
        user=User.objects.create_user(**validated_data)
        return user
    
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields=["id", "title", "content", "created_at","author"]
        extra_kwargs= {"author":{"read_only":True}} 
        
        
class WordBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = WordBank
        fields = ["id", "author", "korean_word", "english_word", "song", "created_at"]
        extra_kwargs = {"author": {"read_only": True}}  