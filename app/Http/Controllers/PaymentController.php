<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Exception\ApiErrorException;
use App\Http\Controllers\Controller;

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
        // Set your Stripe API key from environment variable
        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            // Retrieve JSON payload from request body
            $jsonObj = $request->json()->all();

            // Calculate order amount (in cents)
            $amount = $this->calculateOrderAmount($jsonObj['items']);

            // Create a PaymentIntent
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $amount,
                'currency' => 'usd',
                'description' => 'Payment for React Store',
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
