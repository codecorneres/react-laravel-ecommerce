<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{

    public function createCategory(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255'
            ]);
            //get tenant_id for $request ['session_id']

            // dd($validatedData);
            $category =  Category::create([
                'name' => $validatedData['name'],


            ]);

            return response()->json(['message' => 'Category Created successfully', 'user' => $category], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }


    public function updateCategory(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id' => 'required',
                'name' => 'required|string|max:255', // Add validation rules for name field

            ]);

            // Find the category by ID
            $category = Category::find($request->id);

            // Check if the category exists
            if (!$category) {
                return response()->json(['message' => 'Category not found'], 404);
            }

            // Update category data
            $category->name = $request->name;
            $category->save();

            // Fetch the updated category details
            $updatedcategory = Category::find($request->id);
            if ($updatedcategory) {
                // Retrieve updated list of products with categories
                $category = Category::get();

                // Return success response
                return response()->json(['category' => $category], 200);
            } else {
                // Return error response if product update failed
                return response()->json(['message' => 'Failed to update category.'], 500);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update category', 'error' => $e->getMessage()], 500);
        }
    }


    public function destroyCategory(Request $request)
    {
        try {
            // Validate request parameters
            $validatedData = $request->validate([
                'id' => 'required',
            ]);

            // Check if the category exists
            $category = Category::find($validatedData['id']);
            if ($category) {
                // Delete the category
                $category->delete();

                // Retrieve updated list of category
                $categories = Category::get();

                // Return success response
                return response()->json([
                    'status' => 'success',
                    'category' => $categories,
                ], 200);
            } else {
                // Return error response if category not found
                return response()->json([
                    'status' => 'error',
                    'message' => 'Category not found.',
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
    public function getCategory(Request $request)
    {
        try {
            $category = Category::get();

            return response()->json(['success' => $category], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }
}
