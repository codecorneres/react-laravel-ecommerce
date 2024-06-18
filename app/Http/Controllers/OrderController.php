<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function getOrder()
    {
        try {
            $orders = Order::with('productdetail')->get();

            return response()->json(['success' => $orders], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }
}
