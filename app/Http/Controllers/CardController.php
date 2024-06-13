<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Card;

class CardController extends Controller
{

    public function addToCard(Request $request)
    {

        try {
            $validatedData = $request->validate([
                'user_id' => 'required|exists:users,id',
                'product_id' => 'required|exists:products,id',
            

            ]);

            $card = new Card;
            $card->user_id = $request->user_id;
            $card->product_id = $request->product_id;
            $card->quaninty = 1;
            $card->save();

            return response()->json(['message' => 'Add to card  successfully', 'user' => $card], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }
    public function getCard($userId)
    {
        try {


            $cardproduct = Card::where('user_id',$userId)->with('user')->with('product')->get();

            return response()->json(['cardproduct' => $cardproduct], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }
    public function destroyCard(Request $request)
    {
        try {
            // Validate request parameters
            $validatedData = $request->validate([
                'id' => 'required',
            ]);

            // Check if the Card exists
            $card = Card::find($validatedData['id']);
            if ($card) {
                // Delete the Card
                $card->delete();

                // Retrieve updated list of Card
                $cards = Card::where('user_id',$request->user_id)->with('user')->with('product')->get();

                // Return success response
                return response()->json([
                    'status' => 'success',
                    'Card' => $cards,
                ], 200);
            } else {
                // Return error response if Card not found
                return response()->json([
                    'status' => 'error',
                    'message' => 'Card not found.',
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
