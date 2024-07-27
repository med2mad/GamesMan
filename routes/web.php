<?php

use Illuminate\Support\Facades\Route;

Route::get('/ds', function () {
    return view ("welcome", ['t'=>[ 'name'=>'flipper cube' , 'link'=>'game link' , 'query'=>request('zz') ]]);
});
