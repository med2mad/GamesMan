<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Game;

Route::get('/', function () {
    return view('index', ['page'=>'index']);
});

Route::get('/play', function () {
    return view('play', ['page'=>'play', 'file'=>request('file'), 'url'=>request('url')]);
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
    if($request->hasFile('file') and $request->file('file')->isValid()) {
        $request->validate(['file' => 'file|mimes:swf']);
        $gamefile = time().'_'.$request->file('file')->getClientOriginalName();
        $request->file('file')->move(public_path('games'), $gamefile);
        $gamefile = substr_replace($gamefile, '', strrpos($gamefile,'swf')-1, strlen('.swf'));
    }

    $photoName = 'none.jpg';
    if($request->hasFile('thumbnail') and $request->file('thumbnail')->isValid()) {
        $request->validate(['thumbnail' => 'file|mimes:jpg,png,jpeg,gif,svg|max:4096']);
        $photoName = time().';'.$request->file('thumbnail')->getClientOriginalName();
        $request->file('thumbnail')->move(public_path('thumbnails/games'), $photoName);
    }

    $data = Game::create([
        'name'=>$request->input('name'), 'file'=>$gamefile, 'url'=>$request->input('url'), 'thumbnail'=>$photoName, 
        'category'=>$request->input('category'), 'screenshot'=>$photoName, 
        'description'=>$request->input('description'),
    ]);

    return (["message"=>'Submitted']);
});
