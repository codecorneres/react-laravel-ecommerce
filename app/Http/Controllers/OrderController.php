<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
    public function getOrder()
    {
        try {
            $orders = Order::with('user')->with('product')->get();
    return response()->json(['success' => $orders], 200);
        } catch (\Exception $e) {
            // Catching more general exception class for robustness
            return response()->json(['message' => 'Error fetching orders', 'error' => $e->getMessage()], 500);
        }
    }
    
    
}
