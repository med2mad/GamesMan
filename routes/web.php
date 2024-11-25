<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Game;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

Route::get('/', function () {
    return view('index', ['page'=>'index']);
});

Route::get('/play/{id}', function ($id) {
    $data = Game::where('id', $id)->get();
    return view('play', ['page'=>'play', 'game'=>$data[0]]);
});

Route::get('/page/games', function (Request $request) {
    $title = $request->input('title');
    $sortby = $request->input('sortby');
    $sortby = $sortby?$sortby:'popularity';
    $order = $request->input('order');
    $order = $order?$order:'desc';

    $paginator = Game::where('title', 'like', '%'.$title.'%')->where('valid', true)
                        ->orderBy($sortby, $order)->orderBy('id', 'asc')->paginate(20);
    return view('games', ["data"=>$paginator, "page"=>'games', "title"=>$title, "sortby"=>$sortby, "order"=>$order]);
});

Route::get('/page/{page}', function ($page) {
    return view($page, ['page'=>$page]);
});

Route::post('/', function (Request $request) {
    $request->validate(['title' => 'required|max:255']);
    $request->validate(['url' => 'required_without:file|max:255']);
    $request->validate(['file' => 'file|mimes:swf|required_without:url']);
    
    $gamefile = '';
    if($request->hasFile('file') and $request->file('file')->isValid()) {
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
        'instructions'=>$request->input('instructions'),
    ]);

    return view('add', ['page'=>'add', "success"=>'success']);
});

Route::post('/signup', function (Request $request) {
    $request->validate([
        'name' => 'required|unique:users|min:5|max:10',
        'password' => 'required|min:5|max:10|confirmed',
        'email' =>  'required|email|unique:users',
    ]);
    User::create([
        'name' => $request->input('name'),
        'password' => Hash::make($request->input('password')),
        'email' => $request->input('email')
    ]);
    return view('index', ['page'=>'index']);
});
Route::post('/login', function (Request $request) {
    $request->validate([
        'name' => 'required|min:5|max:10',
        'password' => 'required|min:5|max:10',
    ]);

    if(Auth::attempt( ["password"=>$request->input('password') , "name"=>$request->input('name')] )){
        $request->session()->regenerate();
        return view('index', ['page'=>'index']);
    }
    else{
        return back()
                ->withErrors(['password' => 'Provided credentials do not match.']) //create @error('password')
                ->withInput(); //repopulates form excepy "password"
    }
});
Route::get('/logout', function () {
    Auth::logout();
    return view('index', ['page'=>'index']);
});