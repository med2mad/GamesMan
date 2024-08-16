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

    $paginator = Game::where('title', 'like', '%'.$title.'%')->orderBy($sortBy, $order)->paginate(3);
    return view('games', ["data"=>$paginator, "page"=>'games', "title"=>$title, "sortBy"=>$sortBy, "order"=>$order]);
});

Route::get('/page/{page}', function ($page) {
    return view($page, ['page'=>$page]);
});

Route::post('/', function (Request $request) {
    if (!$request->input('title'))
    { return view('add', ['page'=>'add', "error"=>'Title required']); }
    else if(!$request->input('url') && !$request->hasFile('file'))
    { return view('add', ['page'=>'add', "error"=>'Game File/Url required']); }

    $gamefile = '';
    if($request->hasFile('file') and $request->file('file')->isValid()) {
        $request->validate(['file' => 'file|mimes:swf']);
        $gamefile = time().'_'.$request->file('file')->getClientOriginalName();
        $request->file('file')->move(public_path('games'), $gamefile);
        $gamefile = substr_replace($gamefile, '', strrpos($gamefile,'swf')-1, strlen('.swf'));
    }

    $thumbnail = 'none.jpg';
    if($request->hasFile('thumbnail') and $request->file('thumbnail')->isValid()) {
        $request->validate(['thumbnail' => 'file|mimes:jpg,png,jpeg,gif,svg|max:4096']);
        $thumbnail = time().'_'.$request->file('thumbnail')->getClientOriginalName();
        $request->file('thumbnail')->move(public_path('images/thumbnails'), $thumbnail);
    }

    $screenshot = 'none.jpg';
    if($request->hasFile('screenshot') and $request->file('screenshot')->isValid()) {
        $request->validate(['screenshot' => 'file|mimes:jpg,png,jpeg,gif,svg|max:4096']);
        $screenshot = time().'_'.$request->file('screenshot')->getClientOriginalName();
        $request->file('screenshot')->move(public_path('images/screenshots'), $screenshot);
    }

    $data = Game::create([
        'title'=>$request->input('title'), 'file'=>$gamefile, 'url'=>$request->input('url'),
        'genre'=>$request->input('genre'), 'screenshot'=>$screenshot, 'thumbnail'=>$thumbnail, 
        'description'=>$request->input('description'),
    ]);

    return view('add', ['page'=>'add', "success"=>'success']);
});
