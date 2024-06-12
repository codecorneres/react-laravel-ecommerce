<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
   
    //Show All user detail

    public function userDetails()
    {
    $userdetails=User::with('role')->get();
    if($userdetails){
        return response()->json(['success' => $userdetails], 200);

    }else{
        return response()->json(['message' => 'Users Not Found'], 422);

    }

    }
}