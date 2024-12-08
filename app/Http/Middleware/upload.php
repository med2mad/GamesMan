<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class upload
{
    public function handle(Request $request, Closure $next): Response
    {
        if($request->hasFile('file') and $request->file('file')->isValid()) {
            $file = $request->file('file')->getClientOriginalName();
            $file = substr_replace($file,'',strrpos($file,'.swf'),strlen('.swf')).'_'.time().'.swf';//time before extension
            $request->file('file')->move(public_path('games'), $file);
            $request->attributes->set('file', $file);
        }
        else{$request->attributes->set('file', $request->input('filename'));}

        if($request->hasFile('thumbnail') and $request->file('thumbnail')->isValid()) {
            $thumbnail = $request->file('thumbnail')->store('/images/thumbnails', 'public');
            $request->attributes->set('thumbnail',basename($thumbnail));
        }
        else{ $request->attributes->set('thumbnail', $request->input('thumbnailname')); }

        if($request->hasFile('screenshot') and $request->file('screenshot')->isValid()) {
            $screenshot = time().'_'.$request->file('screenshot')->getClientOriginalName();
            $request->file('screenshot')->store(public_path('/images/screenshots'), $screenshot);
            $request->attributes->set('screenshot',$screenshot);
        }
        else{ $request->attributes->set('screenshot', $request->input('screenshotname')); }

        return $next($request);
    }
}
