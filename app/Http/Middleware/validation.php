<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class validation
{
    public function handle(Request $request, Closure $next): Response
    {
        $request->validate(['title' => 'required|max:255']);
        $request->validate(['file' => 'file|mimes:swf|required_without_all:url,filename'] , ['file.required_without_all' => 'Inter file or URL!']);
        $request->validate(['url' => 'required_without_all:file,filename|max:255'] , ['url.required_without_all' => 'Inter file or URL!']);
        $request->validate(['thumbnail' => 'file|mimes:jpg,png,jpeg,gif,svg|max:4096']);
        $request->validate(['screenshot' => 'file|mimes:jpg,png,jpeg,gif,svg|max:4096']);
        
        return $next($request);
    }
}
