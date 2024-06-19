<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required',
                'review' => 'required',
            
            ]);
    
            $review = Review::create([
                'name' => $request->name,
                'email' => $request->email,
                'review' => $request->review,
                'rating'=>$request->rating,
                'product_id'=>$request->productId
            ]);

            return response()->json(['message' => 'Review Created successfully', 'review' => $review], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
       
    }
    //Show All review 

    public function reviewDetails(Request $request)
    {
    $review=Review::where('product_id', $request->productId)->get();
    if($review){
        return response()->json(['success' => $review], 200);

    }else{
        return response()->json(['message' => 'Review Not Found'], 422);

    }

    }
}