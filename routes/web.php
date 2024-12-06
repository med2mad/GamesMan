<?php

use App\Http\Middleware\upload;
use App\Http\Middleware\validation;
use App\Http\Middleware\authorization;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\saveGame_controller;
use Illuminate\Support\Str;

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

Route::get('/page/signup', function () {
    return view('signup', ["route"=>'/signup', "page"=>'signup']);
});


Route::middleware([authorization::class])->group(function () {
    Route::get('/page/dashboard', function () {
        $games = Game::select('id', 'title', 'thumbnail', 'genre1', 'genre2', 'played', 'created_at')
                        ->where('userId', Auth::id())->orderBy('id', 'desc')->get();
        return view('dashboard', ["games"=>$games, 'page'=>'dashboard']);
    });
    Route::get('/page/editprofile', function () {
        return view('signup', ["user"=>Auth::user(), "route"=>'/editprofile']);
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
    Route::post('/add', [saveGame_controller::class, 'save']);
    Route::post('/edit/{gameId}', [saveGame_controller::class, 'save']);
});

Route::get('/play/{gameId}', function ($gameId) {
    $game = tap(Game::find($gameId))->increment('played');
    return view('play', ['game'=>$game, 'page'=>'play']);
});

Route::post('/signup', function (Request $request) {
    $request->validate([
        'name' => 'required|unique:users|min:5|max:10',
        'password' => 'required|min:5|max:10|confirmed',
        'email' =>  'required|unique:users|email',
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
        'remember_token' => Str::random(10),
    ]);

    $form = '<form id="redirect-form" method="POST" action="/login">' . csrf_field() . '
            <input type="hidden" name="name" value="'.$request->input('name').'">
            <input type="hidden" name="password" value="'.$request->input('password').'">
        </form>
        <script>document.getElementById("redirect-form").submit();</script>';

    return response($form);
});

Route::post('/login', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|min:5|max:10',
        'password' => 'required|min:5|max:10',
    ]);

    if(Auth::attempt( ["password"=>$validated['password'] , "name"=>$validated['name']] )){
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