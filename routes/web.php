<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Game;

Route::get('/', function () {
    return view('index', ['page'=>'index']);
});

Route::get('/play/{file}', function ($file) {

    return view('play', ['file'=>$file, 'page'=>'play']);
});

Route::get('/page/games', function () {
    $data = Game::orderBy('id','desc');
    return view('games', ['data'=>$data->get(), 'page'=>'games']);
});

Route::get('/page/{page}', function ($page) {
    return view($page, ['page'=>$page]);
});

Route::post('/', function (Request $request) {
    $gamefile = '';
    if($request->hasFile('file') and $request->file('file')->isValid()){     
        $request->validate(['file' => 'required|file|mimes:swf']);
        $gamefile = $request->file('file')->getClientOriginalName();
        $request->file('file')->move(public_path('games'), $gamefile);
    }

    $photoName = 'none.jpg';
    if($request->hasFile('image') and $request->file('image')->isValid()){   
        $request->validate(['image' => 'required|file|mimes:jpg,png,jpeg,gif,svg|max:4096']);    
        $photoName = $request->file('image')->getClientOriginalName().time(); 
        $request->file('image')->move(public_path('images/games'), $photoName);
    }

    $data = Game::create([
        'name'=>$request->input('name'), 'file'=>substr_replace($gamefile, '', strrpos($gamefile,'swf')-1, strlen('.swf')), 
        'category'=>$request->input('category'), 'origin'=>$request->input('origin'), 'description'=>$request->input('description'),
        'date'=>$request->input('date'), 'image'=>$photoName, 'url'=>$request->input('url'),
    ]);

    return redirect('/page/games');
});
