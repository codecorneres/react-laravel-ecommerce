<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
   
    public function createProduct(Request $request)
    {

        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', 
                'price' =>'required',
                'category_id' =>'required',
            ]);
             
              $product = new Product;
              $product->category_id =$request->category_id;
              $product->name = $request->name;
              $product->price = $request->price;
              $product->size = $request->size;
              $product->color = $request->color;
              //Store image
              if ($request->hasFile('image')) {
                $imageName = $request->file('image')->getClientOriginalName(); 
                $request->file('image')->move(public_path('storage/app/products_images'), $imageName); 
                $product->image = $imageName; 
            }
            $product->save();

                return response()->json(['message' => 'Product Created successfully', 'user' => $product], 200);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }
public function updateProduct(Request $request)
{
    try {
        // Validate request parameters
        $validatedData = $request->validate([
            'id' => 'required|exists:products,id',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id', // Add validation for category_id

       
        ]);
        
        // Initialize product data array
        $productData = [
            'name' => $request->name,
            'category_id' => $request->category_id,
            'price' => $request->price, 
        ];
      
        // Check if image file is provided in the request
        if ($request->hasFile('image')) {
            // Store image file and update product data with image name
            $imageName = $request->file('image')->getClientOriginalName(); 
            $request->file('image')->move(public_path('storage/app/products_images'), $imageName); 
            $productData['image'] = $imageName;
        }
        
        // Update product data in the database
        $updateProduct = Product::where('id', $validatedData['id'])->update($productData);
        
        // Check if product was successfully updated
        if ($updateProduct) {
            // Retrieve updated list of products with categories
            $products = Product::with('category')->get();
         
            // Return success response
            return response()->json(['product' => $products], 200);
        } else {
            // Return error response if product update failed
            return response()->json(['message' => 'Failed to update product.'], 500);
        }
       
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Return validation error response
        return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
    } catch (\Exception $e) {
        // Return generic error response
        return response()->json(['message' => 'Failed to update product', 'error' => $e->getMessage()], 500);
    }
}

public function destroyProduct(Request $request)
{
    try {
        // Validate request parameters
        $validatedData = $request->validate([
            'id' => 'required|exists:products,id',
        ]);

        // Check if the product exists
        $product = Product::find($validatedData['id']);
        if ($product) {
            // Delete the product
            $product->delete();

            // Retrieve updated list of products
            $products = Product::with('category')->get();

            // Return success response
            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted successfully.',
                'product' => $products,
            ], 200);
        } else {
            // Return error response if product not found
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found.',
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

    public function getProduct(Request $request)
    {
        try {


            $product = Product::with('category')->get();

            return response()->json(['success' => $product], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }
    public function singleProduct($productId)
    {
        try {


            $product = Product::where('id', $productId)->with('category')->get();
            return response()->json(['success' => $product], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }
    public function filterProduct(Request $request)
    {
        try {
            $categoryId=$request->category_id;
          
            if (!$categoryId) {
                $product = Product::with('category')->get();
            } else {
                // Fetch products based on the provided category ID
                $product = Product::where('category_id', $categoryId)->with('category')->get();
            }

            return response()->json(['success' => $product], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }
   
}