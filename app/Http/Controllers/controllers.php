<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

class controllers extends Controller
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

        if ($request->gameId) {
            Game::where('id', $request->gameId)->update($values);
        }
        else {
            Game::create($values);
        }

        return redirect('/page/dashboard');
    }


    function profile(Request $request) {
        $values = $request->validate([
            'name' =>  ['required','min:5','max:10',Rule::unique('users','name')->ignore($request->userId)],
            'email' =>  ['required', 'email', Rule::unique('users','email')->ignore($request->userId)],
            'password' => 'required|min:5|max:10|confirmed',
        ]);
    
        $values['password'] = Hash::make($request->input('password'));
        
        if($request->hasFile('photo') and $request->file('photo')->isValid()) {
            $request->validate(['photo' => 'file|mimes:jpg,png,jpeg,gif,svg']);
            $fileName = time().'_'.$request->file('photo')->getClientOriginalName();
            $request->file('photo')->move(public_path('images/users'), $fileName);
            $values['photo'] = $fileName;
        }
    
        if ($request->userId) {
            $oldEmail = Auth::user()->email;
            if($oldEmail != $request->input('email')){ $values['email_verified_at']=null; }
            User::where('id', $request->userId)->update($values);
        }
        else {
            User::create($values);
        }
    
        $form = '<form id="redirect-form" method="POST" action="/login">'.csrf_field().
                '<input type="hidden" name="name" value="'.$request->input('name').'">
                <input type="hidden" name="password" value="'.$request->input('password').'">
                </form>
                <script>document.getElementById("redirect-form").submit();</script>';
        return response($form);
    }
}
