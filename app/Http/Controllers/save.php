<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use Illuminate\Support\Facades\Auth;

class save extends Controller
{
    function save(Request $request, $id=null) {
        $values = [
            'title'=>$request->input('title'), 'url'=>$request->input('url'),
            'genre1'=>$request->input('genre1'), 'genre2'=>$request->input('genre2'),
            'instructions'=>$request->input('instructions'), 'userId'=>Auth::user()->id,
        ];

        $values['file'] = $request->attributes->get('file');

        $values['thumbnail'] = $request->attributes->get('thumbnail');
    
        $values['screenshot'] = $request->attributes->get('screenshot');

        if ($id) {
            Game::find($id)->update($values);
        }
        else {
            Game::create($values);
        }

        return redirect('/page/dashboard');
    }
}
