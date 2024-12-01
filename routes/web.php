<?php

use App\Http\Middleware\fileupload;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

Route::get('/', function () {
    return view('index', ['page'=>'index']);
});

Route::get('/play/{id}', function ($id) {
    $game = tap(Game::find($id))->increment('played');
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

Route::get('/page/dashboard', function (Request $request) {
    $games = Game::where('userId', Auth::user()->id)->orderBy('id', 'desc')->get();
    return view('dashboard', ["games"=>$games, 'page'=>'dashboard']);
});

Route::get('/page/add', function () {
    return view('add', ["route"=>'/add', 'page'=>'add']);
});
Route::get('/page/edit/{id}', function (Request $request) {
    $game = Game::find($request->id);
    return view('add', ['route'=>'/edit/'.$request->id, "game"=>$game, 'page'=>'edit']);
});

Route::get('/page/{page}', function ($page) {
    return view($page, ['page'=>$page]);
});

Route::post('/add', function (Request $request) {
    $request->validate(['title' => 'required|max:255']);
    $request->validate(['url' => 'required_without:file|max:255']);
    
    
    
    $gamefile = $request->attributes->get('gamefile');

    $thumbnail = 'none.jpg';
    if($request->hasFile('thumbnail') and $request->file('thumbnail')->isValid()) {
        $request->validate(['thumbnail' => 'file|mimes:jpg,png,jpeg,gif,svg|max:4096']);
        $thumbnail = time().'_'.$request->file('thumbnail')->getClientOriginalName();
        $request->file('thumbnail')->move(public_path('/images/thumbnails'), $thumbnail);
    }

    $screenshot = 'none.jpg';
    if($request->hasFile('screenshot') and $request->file('screenshot')->isValid()) {
        $request->validate(['screenshot' => 'file|mimes:jpg,png,jpeg,gif,svg|max:4096']);
        $screenshot = time().'_'.$request->file('screenshot')->getClientOriginalName();
        $request->file('screenshot')->move(public_path('/images/screenshots'), $screenshot);
    }

    Game::create([
        'title'=>$request->input('title'), 'file'=>$gamefile, 'url'=>$request->input('url'),
        'genre1'=>$request->input('genre1'), 'genre2'=>$request->input('genre2'),
        'screenshot'=>$screenshot, 'thumbnail'=>$thumbnail, 
        'instructions'=>$request->input('instructions'), 'userId'=>Auth::user()->id,
    ]);

    return redirect('/page/dashboard');

})->middleware(fileupload::class);

Route::post('/edit/{id}', function (Request $request) {
    $request->validate(['title' => 'required|max:255']);
    $request->validate(['url' => 'required_without:file|max:255']);
    $request->validate(['file' => 'file|mimes:swf|required_without_all:url,fliename']);

    $values = [
        'title'=>$request->input('title'), 'url'=>$request->input('url'),
        'genre1'=>$request->input('genre1'), 'genre2'=>$request->input('genre2'),
        'instructions'=>$request->input('instructions'),
    ];

    if($request->hasFile('file') and $request->file('file')->isValid()) {
        $gamefile = time().'_'.$request->file('file')->getClientOriginalName();
        $request->file('file')->move(public_path('games'), $gamefile);
        $gamefile = substr_replace($gamefile, '', strrpos($gamefile,'swf')-1, strlen('.swf'));
        $values['file']=$gamefile;
    }

    if($request->hasFile('thumbnail') and $request->file('thumbnail')->isValid()) {
        $request->validate(['thumbnail' => 'file|mimes:jpg,png,jpeg,gif,svg|max:4096']);
        $thumbnail = time().'_'.$request->file('thumbnail')->getClientOriginalName();
        $request->file('thumbnail')->move(public_path('/images/thumbnails'), $thumbnail);
        $values['thumbnail']=$thumbnail;
    }

    if($request->hasFile('screenshot') and $request->file('screenshot')->isValid()) {
        $request->validate(['screenshot' => 'file|mimes:jpg,png,jpeg,gif,svg|max:4096']);
        $screenshot = time().'_'.$request->file('screenshot')->getClientOriginalName();
        $request->file('screenshot')->move(public_path('/images/screenshots'), $screenshot);
        $values['screenshot']=$screenshot;
    }

    Game::find($request->id)->update($values);

    return redirect('/page/dashboard');
});

Route::delete('/delete/{id}', function (Request $request) {
    dd(Auth::id());
    $game = Game::find($request->id);
    Game::find($request->id)->delete();
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
Route::get('/login', function (Request $request) {
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