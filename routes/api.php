<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CardController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/get/users', [AuthController::class, 'userDetails']);
 //--------------------------------Category------------------------------------------//
 Route::get('/get/all/category', [CategoryController::class, 'getCategory']);
 Route::post('/create/category', [CategoryController::class, 'createCategory']);
 Route::post('/update/category', [CategoryController::class, 'updateCategory']);
 Route::post('/delete/category', [CategoryController::class, 'destroyCategory']);

  //--------------------------------product------------------------------------------//
  Route::get('/get/all/product', [ProductController::class, 'getProduct']);
  Route::get('/get/single/product/{productId}', [ProductController::class, 'singleProduct']);
  Route::post('/create/product', [ProductController::class, 'createProduct']);
  Route::post('/update/product', [ProductController::class, 'updateProduct']);
  Route::post('/delete/product', [ProductController::class, 'destroyProduct']);
  Route::post('/filter/product', [ProductController::class, 'filterProduct']);
//--------------------------------card------------------------------------------//
Route::get('/get/card/product/{userId}', [CardController::class, 'getCard']);
Route::post('/addtocard', [CardController::class, 'addToCard']);
Route::post('/delete/card', [CardController::class, 'destroyCard']);
