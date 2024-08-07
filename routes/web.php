<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Game;

Route::get('/', function (Request $request) {
    return view('index', ['page'=>'index']);
});

Route::get('/page/{page}', function ($page) {
    return view($page, ['page'=>$page]);
});

Route::get('/services', function (Request $request) {
    $data = Game::orderBy('id','desc');
    return view('services', ['data'=>$data->get(), 'page'=>'services']);
});

Route::post('/', function (Request $request) {
    $photoName = 'none.jpg';
    if($request->hasFile('file') and $request->file('file')->isValid()){   
        $request->validate(['file' => 'required|file|mimes:jpg,png,jpeg,gif,svg|max:4096']);    
        $photoName = $request->file('file')->getClientOriginalName().time(); 
        $request->file('file')->move(public_path('images/games'), $photoName);
    }

    $data = Game::create([
        'name'=>$request->input('name'), 'url'=>$request->input('url'), 'file'=>$photoName,
        'type'=>$request->input('type'), 'origin'=>$request->input('url'), 'description'=>$request->input('description'),
        'date'=>$request->input('date'),
    ]);

    return redirect('/services');  
});
