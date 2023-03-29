from rest_framework import generics
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


class RegisterAPI(generics.GenericAPIView):
    permission_classes = ()
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": Token.objects.create(user=user).key
        })


class LoginAPI(generics.GenericAPIView):
    permission_classes = ()
    serializer_class = LoginSerializer    

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })


class LogoutAPI(generics.GenericAPIView):
    def post(self, request):
        request.user.auth_token.delete()
        return Response('User Logged out successfully')



class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user