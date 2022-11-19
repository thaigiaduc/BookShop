<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PublisherController;
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
    Route::get('/order',[OrderController::class,'showOrder']);
    Route::get('/order/detail/{id}',[OrderController::class,'showOrderDetail']);
    Route::patch('/order/update/status',[OrderController::class,'updateStatusOrder']);
});

    //login routing
    Route::post('session', [LoginController::class, 'login'])->name('api.login');

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

    // admin ----------------------------------------------------------------------------------------
    // Manage book routing
    Route::get('/admin/ManageBook',[BookController::class,'showBookAdmin']);
    Route::post('/admin/ManageBook/create',[BookController::class,'insertBookAdmin']);

    // Manage author routing
    Route::get('/admin/ManageAuthor', [AuthorController::class,'getAuthorAdmin']);
    Route::post('/admin/ManageAuthor/create',[AuthorController::class,'insertAuthorAdmin']);
    // Manage category routing
    Route::get('/admin/ManageCategory',[CategoryController::class,'getCategoryAdmin']);
    Route::post('/admin/ManageCategory/create',[CategoryController::class,'insertCategoryAdmin']);