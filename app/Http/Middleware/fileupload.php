<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class fileupload
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $request->validate(['file' => 'file|mimes:swf|required_without_all:url,fliename'] , [ 'file.required_without_all' => 'Inter file or URL!']);

        $gamefile = '';
        if($request->hasFile('file') and $request->file('file')->isValid()) {
            $gamefile = time().'_'.$request->file('file')->getClientOriginalName();
            $request->file('file')->move(public_path('games'), $gamefile);
            $gamefile = substr_replace($gamefile, '', strrpos($gamefile,'swf')-1, strlen('.swf'));
        }

        $request->attributes->set('gamefile',$gamefile);
        
        return $next($request);
    }
}
