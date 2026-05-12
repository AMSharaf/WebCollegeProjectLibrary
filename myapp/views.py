import json
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User, auth
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import messages
from .models import Book


def index(request):
    books = Book.objects.all()
    return render(request, 'index.html', {'books': books})


@login_required(login_url='Login')
def borrow_book(request, book_id):
    if request.method == 'POST':
        book = get_object_or_404(Book, id=book_id)
        if book.borrowed_by is None:
            book.borrowed_by = request.user
            book.is_borrowed = True
            book.save()
    return redirect('index')


def Signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        cPassword = request.POST['cPassword']
        user_type = request.POST['user_type']

        if password == cPassword:
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Email Already Used')
                return redirect('Signup')
            elif User.objects.filter(username=username).exists():
                messages.info(request, 'Username Already Exists')
                return redirect('Signup')
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                if user_type == 'admin':
                    user.is_staff = True
                user.save()
                return redirect('Login')
        else:
            messages.info(request, 'Passwords do not match')
            return redirect('Signup')
    else:
        return render(request, 'Signup.html')


def Login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            # FIX: Use named URL redirects instead of raw path strings
            if request.user.is_staff:
                return redirect('admin_dashboard')
            else:
                return redirect('index')
        else:
            messages.info(request, 'Invalid username or password')
            return redirect('Login')

    return render(request, 'Login.html')


def Logout(request):
    auth.logout(request)
    return redirect('index')


@login_required(login_url='Login')
def borrowed_books(request):
    # Admins see all borrowed books across all users; regular users see only their own
    if request.user.is_staff:
        user_books = Book.objects.filter(is_borrowed=True).select_related('borrowed_by')
    else:
        user_books = Book.objects.filter(borrowed_by=request.user)
    return render(request, 'Borrowed_Book.html', {'borrowed_books': user_books})


@login_required(login_url='Login')
def return_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    # Admins can force-return any book; users can only return their own
    if request.user.is_staff or book.borrowed_by == request.user:
        book.borrowed_by = None
        book.is_borrowed = False
        book.save()
    return redirect('borrowed_books')


@staff_member_required(login_url='Login')
def admin_dashboard(request):
    books = Book.objects.all()
    return render(request, 'admin_dashboard.html', {'books': books})


@staff_member_required(login_url='Login')
def add_book(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        image = request.FILES.get('cover_image')
        author = request.POST.get('author')
        category = request.POST.get('category')
        price = request.POST.get('price')
        details = request.POST.get('description')
        Book.objects.create(
            title=title, author=author, category=category,
            price=price, details=details, cover_image=image
        )
        return redirect('admin_dashboard')
    return render(request, 'add_book.html')


@staff_member_required(login_url='Login')
def delete_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    book.delete()
    return redirect('admin_dashboard')


@staff_member_required(login_url='Login')
def edit_book(request):
    # FIX: Moved books_queryset and books_json BEFORE the POST redirect so context
    #      is always built. Dead code after return has been removed.
    books_queryset = Book.objects.all()
    books_list = list(books_queryset.values('id', 'title', 'author', 'category', 'price', 'details'))
    books_json = json.dumps(books_list, cls=DjangoJSONEncoder)

    if request.method == 'POST':
        selected_book_id = request.POST.get('book_id')
        action = request.POST.get('action')

        if selected_book_id:
            book = get_object_or_404(Book, id=selected_book_id)
            if action == 'delete':
                book.delete()
            elif action == 'edit':
                book.title = request.POST.get('title')
                book.author = request.POST.get('author')
                book.category = request.POST.get('category')
                book.price = request.POST.get('price')
                book.details = request.POST.get('description')
                image = request.FILES.get('cover_image')
                if image:
                    book.cover_image = image
                book.save()

        return redirect('admin_dashboard')

    context = {
        'books': books_queryset,
        'books_json': books_json,
    }
    return render(request, 'edit_book.html', context)


def book_details(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'Book_Details.html', {'book': book})


def post(request, pk):
    return render(request, 'post.html', {'pk': pk})
