<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\StatisticController;
use App\Models\Publisher;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/  

Route::middleware(['auth:sanctum'])->group(function () {    

    Route::delete('session', [LoginController::class, 'logout'])->name('api.logout');

    //user routing
    Route::patch('user/update/profile',[UserController::class,'editUserProfile']);
    Route::patch('user/update/password',[UserController::class,'editPassword']);
    Route::get('user/detail',[UserController::class,'getUserDetail']);
  
    //order routing
    Route::post('/order',[OrderController::class,'createorder']);
    Route::get('/order',[OrderController::class,'showOrderUser']);

    // admin ----------------------------------------------------------------------------------------
    // Manage book routing
    Route::get('/admin/ManageBook',[BookController::class,'showBookAdmin']);
    Route::post('/admin/ManageBook/create',[BookController::class,'insertBookAdmin']);
    Route::get('/admin/ManageBook/details/{id}',[BookController::class,'getDetailsBookAdmin']);
    Route::post('/admin/ManageBook/update/{id}',[BookController::class,'updateBookAdmin']);
    Route::post('/admin/ManageBook/delete/{id}',[BookController::class,'deleteBookAdmin']);
    // Manage author routing
    Route::get('/admin/ManageAuthor', [AuthorController::class,'getAuthorAdmin']);
    Route::post('/admin/ManageAuthor/create',[AuthorController::class,'insertAuthorAdmin']);
    Route::get('/admin/ManageAuthor/details/{id}',[AuthorController::class,'showDetailAuthor']);
    Route::post('/admin/ManageAuthor/update/{id}',[AuthorController::class,'updateAuthor']);
    Route::post('/admin/ManageAuthor/delete/{id}',[AuthorController::class,'deleteAuthorAdmin']);
    // Manage category routing
    Route::get('/admin/ManageCategory',[CategoryController::class,'getCategoryAdmin']);
    Route::post('/admin/ManageCategory/create',[CategoryController::class,'insertCategoryAdmin']);
    Route::get('/admin/ManageCategory/details/{id}',[CategoryController::class,'showDetailCategory']);
    Route::post('/admin/ManageCategory/update/{id}',[CategoryController::class,'updateCategory']);
    Route::post('/admin/ManageCategory/delete/{id}',[CategoryController::class,'deleteCategoryAdmin']);
    // Manage publisher routing
    Route::get('/admin/ManagePublisher', [PublisherController::class,'showPublisher']);
    Route::post('/admin/ManagePublisher/create', [PublisherController::class,'insertPubliserAdmin']);
    Route::get('/admin/ManagePublisher/details/{id}',[PublisherController::class,'showDetailPublisher']);
    Route::post('/admin/ManagePublisher/update/{id}',[PublisherController::class,'updatePublisher']);
    Route::post('/admin/ManagePublisher/delete/{id}',[PublisherController::class,'deletePublisherAdmin']);
    // Manage discount routing
    Route::get('/admin/ManageDiscount', [DiscountController::class,'getDiscountAdmin']);
    Route::post('/admin/ManageDiscount/create', [DiscountController::class,'insertDiscountAdmin']);
    Route::get('/admin/ManageDiscount/details/{id}',[DiscountController::class,'showDetailDiscount']);
    Route::post('/admin/ManageDiscount/update/{id}',[DiscountController::class,'updateDiscount']);
    Route::post('/admin/ManageDiscount/delete/{id}',[DiscountController::class,'deleteDiscountAdmin']);
    //Manage User Routing
    Route::get('admin/user',[UserController::class,'index']);
    Route::patch('admin/user/update',[UserController::class,'updateStatus']);
   
    Route::get('/admin/order',[OrderController::class,'showOrder']);
    Route::get('/order/detail/{id}',[OrderController::class,'showOrderDetail']);
    Route::patch('/order/update/status',[OrderController::class,'updateStatusOrder']);

    //Manage Import Routing
    Route::post('/admin/import',[ImportController::class,'store']);

    //Statistic Routing
    Route::get('/admin/statistic',[StatisticController::class,'index']);
});
    //login routing
    Route::post('session', [LoginController::class, 'login'])->name('api.login');
    Route::post('user/create',[UserController::class,'store']);

    //author routing
    Route::get('/author',[AuthorController::class,'getAuthor']);

    
    // book routing
    Route::get('/book/detail',[BookController::class,'getBookByID']); 
    Route::get('/book/shop',[BookController::class,'indexshop']);
    Route::get('/home/onsale',[BookController::class,'showHomeBookOnSale']);
    Route::get('/home/popular',[BookController::class,'showHomeBookPopular']); 
    Route::get('/home/recommended',[BookController::class,'showHomeBookRecommended']); 

    // category routing
    Route::get('/category',[CategoryController::class,'index']);

    // publisher routing
    Route::get('/publisher',[PublisherController::class,'getPublisher']);

    // review routing
    Route::get('/review',[ReviewController::class,'getReviewByBook']);
    Route::post('/review/create',[ReviewController::class,'createReview']);
    Route::get('/review/rating', [ReviewController::class, 'getRating']);