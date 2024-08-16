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

Route::get('/page/games', function (Request $request) {
    $title = $request->input('title');
    $sortBy = $request->input('sort');
    $sortBy = $sortBy?$sortBy:'popularity';
    $order = $request->input('order');
    $order = $order?$order:'desc';

    $data = Game::where('title', 'like', '%'.$title.'%')->orderBy($sortBy, $order);
    return view('games', ["data"=>$data->get(), "page"=>'games', "title"=>$title, "sortBy"=>$sortBy, "order"=>$order]);
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
        'title'=>$request->input('title'), 'file'=>$gamefile, 'url'=>$request->input('url'), 'thumbnail'=>$photoName, 
        'genre'=>$request->input('genre'), 'screenshot'=>$photoName, 
        'description'=>$request->input('description'),
    ]);

    return (["message"=>'Submitted']);
});
