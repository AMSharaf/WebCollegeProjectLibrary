import json
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import messages
from .models import Book

# Create your views here.
def index(request):
    books=Book.objects.all()
    return render(request,'index.html',{'books':books})

@login_required(login_url='login') 
def borrow_book(request, book_id):
    if request.method == 'POST':
        book = get_object_or_404(Book, id=book_id)
        
        if book.borrowed_by is None:
            book.borrowed_by = request.user
            book.is_borrowed=True
            book.save()
            
    return redirect('index')


def Signup(request):
    if request.method =='POST':
        username=request.POST['username']
        email=request.POST['email']
        password=request.POST['password']
        cPassword=request.POST['cPassword']
        user_type=request.POST['user_type']
        if password == cPassword:
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Email Already Used')
                return redirect('Signup')
            elif User.objects.filter(username=username).exists():
                messages.info(request, ' Username Already Exists')
                return redirect('Signup')
            else: 
                user= User.objects.create_user(username=username,email=email,password=password)

                if user_type == "admin":
                    user.is_staff =True

                user.save();
                return redirect('Login')
        else:
            messages.info(request,'Password is not the same')
            return redirect('Signup')
    else:
        return render(request,'Signup.html')


def Login(request):
    if request.method=='POST':
        username=request.POST['username']
        password=request.POST['password']
        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request,user)
            if(request.user.is_staff):
                return redirect('admin-dashboard/')
            else:
                return redirect('/')
        else:
            messages.info(request,'Credentials Invalid')
            return redirect('Login')

    return render(request,'Login.html')


def Logout(request):
    auth.logout(request)
    return redirect('/')

@login_required(login_url='login')
def borrowed_books(request):
    user_books = Book.objects.filter(borrowed_by=request.user)
    return render(request, 'Borrowed_Book.html', {'borrowed_books': user_books})

@login_required(login_url='login')
def return_book(request, book_id):
    
    book = get_object_or_404(Book, id=book_id)
        
    if book.borrowed_by == request.user:
        book.borrowed_by = None
        book.is_borrowed=False
        book.save()
            
    return redirect('borrowed_books')

@staff_member_required(login_url='login')
def admin_dashboard(request):
    books = Book.objects.all()
    return render(request, 'admin_dashboard.html', {'books': books})

@staff_member_required(login_url='login')
def add_book(request):
    if request.method =='POST':
        title=request.POST.get('title')
        image = request.FILES.get('cover_image')
        author = request.POST.get('author')
        category = request.POST.get('category')
        price = request.POST.get('price')
        details=request.POST.get('description')
        Book.objects.create(title=title, author=author, category=category, price=price,details=details,cover_image=image)
        return redirect('admin_dashboard')
    return render(request,'add_book.html')

@staff_member_required(login_url='login')
def delete_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    book.delete() 
    return redirect('admin_dashboard')


@staff_member_required(login_url='login')

def edit_book(request):  
    books=Book.objects.all()
      
    if request.method == 'POST':
        selected_book_id = request.POST.get('book_id')
        action = request.POST.get('action')
        if selected_book_id:
            book = get_object_or_404(Book, id=selected_book_id)
            if action=='delete':
                book.delete()
            elif action=='edit':
                book.title = request.POST.get('title')
                book.author = request.POST.get('author')
                book.category = request.POST.get('category')
                book.price = request.POST.get('price')
                image = request.FILES.get('cover_image')
                if(image):
                    book.cover_image=image
                    
                book.details=request.POST.get('description')

                book.save()
            
        return redirect('admin_dashboard')
        books_queryset = Book.objects.all()
    books_queryset = Book.objects.all()
    # Create a list of dictionaries for our JavaScript cache
    # (Using .values() safely extracts just the data we need)
    books_list = list(books_queryset.values('id', 'title', 'author', 'category', 'price', 'details'))
    
    # Convert that Python list into a JSON string
    books_json = json.dumps(books_list, cls=DjangoJSONEncoder)
    # Send both the queryset and the JSON string to the template
    context = {
        'books': books_queryset,
        'books_json': books_json
    }
    return render(request, 'edit_book.html', {'books': books})

def book_details(request,book_id):
    book = get_object_or_404(Book, id=book_id)
    
    return render(request,'Book_Details.html',{'book':book})


def post(request,pk):
    return render(request, 'post.html', {'pk':pk})
