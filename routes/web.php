<?php

use App\Http\Middleware\upload;
use App\Http\Middleware\validation;
use App\Http\Middleware\authorization;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\controllers;


Route::get('/', function () {
    return view('index', ['page'=>'index']);
});

Route::get('/page/games', function (Request $request) {
    $title = $request->input('title');
    $sortby = $request->input('sortby');
    $sortby = $sortby?$sortby:'popularity';
    $order = $request->input('order');
    $order = $order?$order:'desc';

    $paginator = Game::select('id', 'title', 'thumbnail', 'screenshot', 'popularity', 'genre1', 'genre2')
                        ->where('title', 'like', '%'.$title.'%')
                        ->orderBy($sortby, $order)->orderBy('id', 'asc')->paginate(20);
    return view('games', ["games"=>$paginator, "page"=>'games', "title"=>$title, "sortby"=>$sortby, "order"=>$order]);
});

Route::get('/page/profile', function () {
    return view('profile', ["route"=>'/profile', "page"=>'signup']);
});
Route::get('/page/editprofile', function () {
    $user = Auth::user();
    return view('profile', ["user"=>$user, "route"=>'/profile/'.$user->id, "page"=>'editprofile']);
});

Route::middleware([authorization::class])->group(function () {
    Route::get('/page/dashboard', function () {
        $games = Game::select('id', 'title', 'thumbnail', 'genre1', 'genre2', 'played', 'created_at')
                        ->where('userId', Auth::id())->orderBy('id', 'desc')->get();
        return view('dashboard', ["games"=>$games, 'page'=>'dashboard']);
    });
    Route::get('/page/add', function () {
        return view('add', ["route"=>'/add']);
    });
    Route::get('/page/edit/{gameId}', function (Request $request) {
        $game = Game::find($request->gameId);
        return view('add', ['route'=>'/edit/'.$request->gameId, "game"=>$game]);
    });
    Route::delete('/delete/{gameId}', function ($gameId) {
        Game::where('id', $gameId)->delete();
        return redirect('/page/dashboard');
    });
});

Route::get('/page/{page}', function ($page) {
    return view($page, ['page'=>$page]);
});

Route::middleware([authorization::class, validation::class, upload::class])->group(function () {
    Route::post('/add', [controllers::class, 'save']);
    Route::post('/edit/{gameId}', [controllers::class, 'save']);
});

Route::get('/play/{gameId}', function ($gameId) {
    $game = tap(Game::find($gameId))->increment('played');
    return view('play', ['game'=>$game, 'page'=>'play']);
});

Route::post('/profile/{userId?}', [controllers::class, 'profile']);

Route::post('/login', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|min:5|max:10',
        'password' => 'required|min:5|max:10',
    ]);

    if(Auth::attempt( $validated )){
        return redirect('/page/dashboard');
    }
    else{
        return back()
                ->withErrors(['password' => 'Wrong name or password.']) //@error('password')
                ->withInput(); //repopulates Form except "password"
    }
});

Route::get('/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return view('index', ['page'=>'index']);
});

Route::get('/verification', function () {
    if(isset($_GET["token"]) && $_GET["token"]==Auth::user()->password) {
        User::where('email', $_GET["mail"])->where('password', $_GET["token"])->update(['email_verified_at'=>now()]);
        return view('signup2');
    }
    else{
        return view('signup1');
    }
});