<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use Illuminate\Support\Facades\Auth;

class saveGame_controller extends Controller
{
    function save(Request $request) {
        $values = [
            'title'=>$request->input('title'), 'url'=>$request->input('url'),
            'genre1'=>$request->input('genre1'), 'genre2'=>$request->input('genre2'),
            'instructions'=>$request->input('instructions'), 'userId'=>Auth::user()->id,
        ];

        $values['file'] = $request->attributes->get('file');

        $values['thumbnail'] = $request->attributes->get('thumbnail');
    
        $values['screenshot'] = $request->attributes->get('screenshot');

        if ($request->id) {
            $game = Game::find($request->id);
            $game->update($values);
        }
        else {
            Game::create($values);
        }

        return redirect('/page/dashboard');
    }
}
