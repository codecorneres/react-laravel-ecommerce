<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Exception\ApiErrorException;
use App\Http\Controllers\Controller;
use App\Models\Order;
class PaymentController extends Controller
{
    /**
     * Pay order via Stripe
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function payByStripe(Request $request)
{
    try {
        // Retrieve data from request
        $user_id = $request->input('user_id');
        $payment_method = $request->input('payment_method');
        $products = $request->input('products');
        $items = $request->input('items');

        // Create a new Order instance
        $order = new Order();
        $order->user_id = $user_id;
        $order->payment_method = $payment_method;

        // Set products data
        $orderProducts = [];
        foreach ($products as $productData) {
            $orderProducts[] = [
                'product_id' => $productData['id'],
                'quantity' => $productData['quantity'],

            ];
        }
        $order->products = $orderProducts;

        // Save the order
        $order->save();

        // Calculate order amount (in cents)
        $amount = array_sum(array_column($items, 'amount'));

        // Set your Stripe API key from environment variable
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Create a PaymentIntent
        $paymentIntent = \Stripe\PaymentIntent::create([
            'amount' => $amount,
            'currency' => 'usd',
            'description' => 'Payment for your order',
            'setup_future_usage' => 'on_session',
        ]);

        // Return client secret to frontend
        $output = [
            'clientSecret' => $paymentIntent->client_secret,
        ];

        return response()->json($output);
    } catch (ApiErrorException $e) {
        // Handle Stripe API errors
        return response()->json(['error' => $e->getMessage()], 500);
    } catch (\Exception $e) {
        // Handle other generic exceptions
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


    /**
     * Calculate order total for Stripe (convert to cents)
     *
     * @param array $items
     * @return int
     */
    private function calculateOrderAmount(array $items): int
    {
        // Replace this with your actual calculation logic
        // Ensure the total is in cents (Stripe requires amount in smallest currency unit)
        $total = 0;

        foreach ($items as $item) {
            $total += $item['amount'] * 100; // assuming amount is in dollars, convert to cents
        }

        return $total;
    }
}
