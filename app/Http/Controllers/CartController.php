<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{

    public function addToCart(Request $request)
{
    try {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id'
        ]);

        $existingProduct = Cart::where('user_id', $request->user_id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingProduct) {
            // Increment quantity by 1
            $existingProduct->quantity += 1;
            $existingProduct->save();
            
            $cartProduct = Cart::where('user_id', $request->user_id)
                ->where('product_id', $request->product_id)
                ->with('user')
                ->with('product')
                ->get();
            
            return response()->json(['user' => $existingProduct], 200);
        }

        $cart = new Cart;
        $cart->user_id = $request->user_id;
        $cart->product_id = $request->product_id;
        $cart->quantity = 1;
        $cart->save();

        return response()->json(['message' => 'Added to cart successfully', 'user' => $cart], 200);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
    }
}

    public function getCart($userId)
    {
        try {


            $cartproduct = Cart::where('user_id',$userId)->with('user')->with('product')->get();

            return response()->json(['cartproduct' => $cartproduct], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }
    public function getCartCount(Request $Request)
    {
        try {
            $cartCount = Cart::where('user_id', $Request->userId)->sum('quantity');
    
            return response()->json(['cartCount' => $cartCount], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching cart count', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function destroyCart(Request $request)
{
    try {
        // Validate request parameters
        $validatedData = $request->validate([
            'id' => 'required',
        ]);

        // Check if the Cart exists
        $cart = Cart::find($validatedData['id']);
        if ($cart) {
            // If quantity is greater than 1, decrement quantity, else delete the cart
            if ($cart->quantity > 1) {
                $cart->decrement('quantity');
                $cart->save();
            } else {
                // Delete the Cart
                $cart->delete();
            }

            // Retrieve updated list of Carts
            $carts = Cart::where('user_id', $request->user_id)->with('user')->with('product')->get();

            // Return success response
            return response()->json([
                'status' => 'success',
                'Cart' => $carts,
            ], 200);
        } else {
            // Return error response if Cart not found
            return response()->json([
                'status' => 'error',
                'message' => 'Cart not found.',
            ], 404);
        }
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Return validation error response
        return response()->json([
            'status' => 'error',
            'message' => 'Validation failed.',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        // Return generic error response
        return response()->json([
            'status' => 'error',
            'message' => 'Something went wrong. Please try again later.',
        ], 500);
    }
}

}
