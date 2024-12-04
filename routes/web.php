<?php

use App\Http\Middleware\uploadGame_middleware;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\saveGame_controller;

Route::get('/', function () {
    return view('index', ['page'=>'index']);
});

Route::get('/play/{gameId}', function ($gameId) {
    $game = tap(Game::find($gameId))->increment('played');
    return view('play', ['page'=>'play', 'game'=>$game]);
});

Route::get('/page/games', function (Request $request) {
    $title = $request->input('title');
    $sortby = $request->input('sortby');
    $sortby = $sortby?$sortby:'popularity';
    $order = $request->input('order');
    $order = $order?$order:'desc';

    $paginator = Game::where('title', 'like', '%'.$title.'%')
                        ->orderBy($sortby, $order)->orderBy('id', 'asc')->paginate(20);
    return view('games', ["data"=>$paginator, "page"=>'games', "title"=>$title, "sortby"=>$sortby, "order"=>$order]);
});

Route::get('/page/dashboard', function () {
    $games = Game::where('userId', Auth::id())->orderBy('id', 'desc')->get();
    return view('dashboard', ["games"=>$games, 'page'=>'dashboard']);
});

Route::get('/page/add', function () {
    return view('add', ["route"=>'/add', 'page'=>'add']);
});
Route::get('/page/edit/{gameId}', function (Request $request) {
    $game = Game::find($request->gameId);
    return view('add', ['route'=>'/edit/'.$request->gameId, "game"=>$game, 'page'=>'edit']);
});

Route::get('/page/{page}', function ($page) {
    return view($page, ['page'=>$page]);
});

Route::middleware([uploadGame_middleware::class])->group(function () {
    Route::post('/add', [saveGame_controller::class, 'save']);
    Route::post('/edit/{gameId}', [saveGame_controller::class, 'save']);
});

Route::delete('/delete/{gameId}', function ($gameId) {
    $game = Game::find($gameId);
    if (!Auth::check()) { abort(401); }
    if ($game->userId != Auth::id()) { abort(403); }
    
    $game->delete();
    return redirect('/page/dashboard');
});

Route::post('/signup', function (Request $request) {
    $request->validate([
        'name' => 'required|unique:users|min:5|max:10',
        'password' => 'required|min:5|max:10|confirmed',
        'email' =>  'required|email|unique:users',
    ]);
    
    $fileName = 'none.jpg';
    if($request->hasFile('photo') and $request->file('photo')->isValid()) {
        $request->validate(['photo' => 'file|mimes:jpg,png,jpeg,gif,svg']);
        $fileName = time().'_'.$request->file('photo')->getClientOriginalName();
        $request->file('photo')->move(public_path('images/users'), $fileName);
    }

    User::create([
        'name' => $request->input('name'),
        'password' => Hash::make($request->input('password')),
        'email' => $request->input('email'),
        'photo' => $fileName,
    ]);
    return view('index', ['page'=>'index']);
});

Route::post('/login', function (Request $request) {
    $request->validate([
        'name' => 'required|min:5|max:10',
        'password' => 'required|min:5|max:10',
    ]);

    if(Auth::attempt( ["password"=>$request->input('password') , "name"=>$request->input('name')] )){
        return redirect('/page/dashboard');
    }
    else{
        return back()
                ->withErrors(['password' => 'Wrong name or password.']) //@error('password')
                ->withInput(); //repopulates form excepy "password"
    }
});

Route::get('/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return view('index', ['page'=>'index']);
});