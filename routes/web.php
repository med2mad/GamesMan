<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

Route::get('/', function (Request $request) {
    return view('about');
});
Route::post('/', function (Request $request) {

    return ($photoName);
});
