<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Game;
use Illuminate\Support\Facades\Auth;

class uploadGame_middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) { abort(401); } //authentication
        if ($request->gameId) {
            $game = Game::find($request->gameId);
            if ($game->userId != Auth::id()) { abort(403); } //authorization / permission
        }

        $request->validate(['title' => 'required|max:255']);
        $request->validate(['file' => 'file|mimes:swf|required_without_all:url,filename'] , ['file.required_without_all' => 'Inter file or URL!']);
        $request->validate(['url' => 'required_without_all:file,filename|max:255'] , ['url.required_without_all' => 'Inter file or URL!']);
        $request->validate(['thumbnail' => 'file|mimes:jpg,png,jpeg,gif,svg|max:4096']);
        $request->validate(['screenshot' => 'file|mimes:jpg,png,jpeg,gif,svg|max:4096']);
        
        if($request->hasFile('file') and $request->file('file')->isValid()) {
            $file = $request->file('file')->getClientOriginalName();
            $file = substr_replace($file,'',strrpos($file,'.swf'),strlen('.swf')).'_'.time().'.swf';//time before extension
            $request->file('file')->move(public_path('games'), $file);
            $request->attributes->set('file', $file);
        }
        else{$request->attributes->set('file', $request->input('filename'));}

        if($request->hasFile('thumbnail') and $request->file('thumbnail')->isValid()) {
            $thumbnail = time().'_'.$request->file('thumbnail')->getClientOriginalName();
            $request->file('thumbnail')->move(public_path('/images/thumbnails'), $thumbnail);
            $request->attributes->set('thumbnail',$thumbnail);
        }
        else{ $request->attributes->set('thumbnail', $request->input('thumbnailname')); }

        if($request->hasFile('screenshot') and $request->file('screenshot')->isValid()) {
            $screenshot = time().'_'.$request->file('screenshot')->getClientOriginalName();
            $request->file('screenshot')->move(public_path('/images/screenshots'), $screenshot);
            $request->attributes->set('screenshot',$screenshot);
        }
        else{ $request->attributes->set('screenshot', $request->input('screenshotname')); }

        return $next($request);
    }
}
