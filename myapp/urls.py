from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),
    path('Signup', views.Signup, name='Signup'),
    path('Login', views.Login, name='Login'),
    # FIX: Added lowercase 'login' alias — some templates use {% url 'login' %}
    path('login', views.Login, name='login'),
    path('Logout', views.Logout, name='Logout'),
    path('my-books', views.borrowed_books, name='borrowed_books'),
    path('return/<int:book_id>', views.return_book, name='return_book'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    # FIX: Removed duplicate edit_book and delete_book entries
    path('edit-book', views.edit_book, name='edit_book'),
    path('admin-dashboard/delete-book/<int:book_id>/', views.delete_book, name='delete_book'),
    path('add-book/', views.add_book, name='add-book'),
    path('book-details/<int:book_id>/', views.book_details, name='book_details'),
    path('post/<str:pk>', views.post, name='post'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
