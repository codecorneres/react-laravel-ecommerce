import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ clientSecret, fetchClientSecret, formData }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        // Use clientSecret to confirm the payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: formData.name,
                    email: formData.email,
                    address: {
                        line1: formData.address,
                        city: formData.city,
                        state: formData.state,
                        postal_code: formData.pincode,
                    },
                    phone: formData.phone,
                },
            },
        });
        console.log(result,'result');
        if (result.error) {
            // Show error to your customer
            console.log(result.error.message);
        } else {
            // Payment successful
            if (result.paymentIntent.status === "succeeded") {
                console.log("Payment succeeded");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button
                type="submit"
                onClick={fetchClientSecret}
                disabled={!stripe}
                className="mt-10 hover:table-fixed text-center bg-blue-400 w-4/5 h-10 rounded-lg"
            >
                Pay Now
            </button>
        </form>
    );
};

export default CheckoutForm;
