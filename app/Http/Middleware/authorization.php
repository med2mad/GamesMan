<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Game;
use Illuminate\Support\Facades\Auth;

class authorization
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) { abort(401); } //unauthorized
        if (is_null(Auth::user()->email_verified_at)) {
            return redirect('/page/signup1');
        }
        if (isset($request->gameId)) {
            $game = Game::select('userId')->find($request->gameId);
            if (!$game || $game->userId != Auth::id()) { abort(403); } //forbidden
        }

        return $next($request);
    }
}
