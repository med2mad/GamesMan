<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


Route::get('/', function (Request $request) {
    return view('index', ['page'=>'index']);
});

Route::get('/page/{page}', function ($page) {
    return view($page, ['page'=>$page]);
});

Route::post('/', function (Request $request) {

    if($request->hasFile('image') and $request->file('image')->isValid())
    {                 
        $photoType = $request->file('image')->getMimeType();
        if(!Str::startsWith($photoType,'image/')){ return response('Error: Only Images!'); }
        $photoSize = $request->file('image')->getSize();
        if($photoSize>1024*1024*5){ return response('Error: image too large'); }

        $photoName = $request->file('image')->getClientOriginalName().time(); 
        $request->file('image')->move(public_path('images/games'), $photoName);
    }
    else{ $photoName = $request->input('selectedPhotoName'); }


    return ($photoName);
});
