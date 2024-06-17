<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class Checkrole
{
    //access with ip
    // public $accessIps = ['143.198.60.224'];

    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        if($user){
        if ($user->role_id == 1) {
            return $next($request);
        }
        return redirect(RouteServiceProvider::HOME);
    }
    return redirect('login');
    }
}
