import React, { useEffect, useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';


export default function Stripe({total}) {
    const stripePromise = loadStripe('pk_test_51PSZRI03ltyGto8gSHT6SmdpZwfpiXzPJ7ym5Feio8vwpOlzvl5rkYKwP19JeVcZUBrO1js9GYRmTeC2FAjAMcuj00L2Vdlfdr');

    const [clientSecret, setClientSecret] = useState("");
    const items = [{ amount: total }];

    useEffect(() => {
        fetchClientSecret();
    }, []);

    const fetchClientSecret = async () => {
        try {
            const response = await axios.post('api/order/pay', {
                items,
            });
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            {
                stripePromise && clientSecret && <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm />
                </Elements>
            }
        </>
    );
}

                                                            
                                                        