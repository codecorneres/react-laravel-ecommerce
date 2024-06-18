import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { RiCloseLine } from "react-icons/ri";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CheckoutForm from "@/Components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import fetchCartProductCount from "@/utils/fetchCartProductCount";

const stripePromise = loadStripe(
    "pk_test_51PSZRI03ltyGto8gSHT6SmdpZwfpiXzPJ7ym5Feio8vwpOlzvl5rkYKwP19JeVcZUBrO1js9GYRmTeC2FAjAMcuj00L2Vdlfdr" // Replace with your actual publishable key
);

export default function Checkout({ auth }) {
    const { user } = auth;
    const [productDetails, setProductDetails] = useState(null);
    const [total, setTotal] = useState(0);
    const [clientSecret, setClientSecret] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("credit_card"); // Default to credit card
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    });
    const userId = user.id;
    const [AddtocartProductCount, setCartProductCount] = useState(0);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/api/get/cart/product/${userId}`);
                setProductDetails(response.data.cartproduct);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [userId]);

    useEffect(() => {
        calculateTotal();
    }, [productDetails]);

    const calculateTotal = () => {
        let sum = 0;
        if (productDetails) {
            productDetails.forEach((product) => {
                sum += product.quantity * product.product.price;
            });
        }
        setTotal(sum);
    };
    const raw = {
      user_id: userId,
      products: productDetails,
      payment_method: paymentMethod,
      items: [{ amount: total }]
  };
  
  const fetchClientSecret = async () => {
      try {
          const response = await axios.post("/api/order/pay", raw);
          setClientSecret(response.data.clientSecret);
      } catch (error) {
          console.error("Error fetching client secret:", error);
          // Handle error
      }
  };
  
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const setData = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const fetchCartCount = async () => {
        try {
            const CartCount = await fetchCartProductCount(user.id);
            setCartProductCount(CartCount);
        } catch (error) {
            console.log("Error fetching cart count:", error);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, []);

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"></h2>}
            AddtocartProductCount={AddtocartProductCount}
        >
            <Head title="Checkout" />
            <div className="container mx-auto px-4 pt-10 pb-[220px] sm:px-6 lg:px-8">
                <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
                <div className="mt-12 grid grid-cols-2 border border-gray-200">
                    <div className="relative border-gray-200">
                        <p className="py-2 px-3 w-full text-2xl font-semibold mt-10 border-b border-gray-200 ml-5">
                            Billing details
                        </p>
                        <form>
                            <div className="m-5">
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    onChange={(e) => setData("name", e.target.value)}
                                    value={formData.name}
                                    required
                                />
                            </div>
                            <div className="m-5">
                                <InputLabel htmlFor="email" value="Your Email" />
                                <TextInput
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    onChange={(e) => setData("email", e.target.value)}
                                    value={formData.email}
                                    required
                                />
                            </div>
                            <div className="m-5">
                                <InputLabel htmlFor="address" value="Address" />
                                <TextInput
                                    id="address"
                                    name="address"
                                    className="mt-1 block w-full"
                                    autoComplete="address"
                                    onChange={(e) => setData("address", e.target.value)}
                                    value={formData.address}
                                    required
                                />
                            </div>
                            <div className="m-5">
                                <InputLabel htmlFor="city" value="City" />
                                <TextInput
                                    id="city"
                                    name="city"
                                    className="mt-1 block w-full"
                                    autoComplete="city"
                                    onChange={(e) => setData("city", e.target.value)}
                                    value={formData.city}
                                    required
                                />
                            </div>
                            <div className="m-5">
                                <InputLabel htmlFor="state" value="State" />
                                <TextInput
                                    id="state"
                                    name="state"
                                    className="mt-1 block w-full"
                                    autoComplete="state"
                                    onChange={(e) => setData("state", e.target.value)}
                                    value={formData.state}
                                    required
                                />
                            </div>
                            <div className="m-5">
                                <InputLabel htmlFor="pincode" value="Pin Code" />
                                <TextInput
                                    id="pincode"
                                    name="pincode"
                                    className="mt-1 block w-full"
                                    autoComplete="pincode"
                                    onChange={(e) => setData("pincode", e.target.value)}
                                    value={formData.pincode}
                                    required
                                />
                            </div>
                            <div className="m-5">
                                <InputLabel htmlFor="phone" value="Phone" />
                                <TextInput
                                    id="phone"
                                    name="phone"
                                    className="mt-1 block w-full"
                                    autoComplete="phone"
                                    onChange={(e) => setData("phone", e.target.value)}
                                    value={formData.phone}
                                    required
                                />
                            </div>
                        </form>
                    </div>

                    <div className="m-10 p-5 relative border border-gray-300">
                        <p className="py-2 px-3 w-full text-2xl font-semibold mt-3 ml-5">
                            Your order
                        </p>

                        <div className="w-full">
                            <div className=" py-2 px-3 w-full font-semibold mt-10 flex justify-between border-b border-gray-200">
                                <span>Product</span>
                                <span>Subtotal</span>
                            </div>
                            {productDetails ? (
                                productDetails.map((product, index) => (
                                    <div key={index} className="py-2 px-3 flex justify-between border-b border-gray-200">
                                        <div className="py-2 px-3 flex items-center justify-between">
                                            <span className="flex items-center">
                                                <span className="mr-2">{product.product.name}</span>
                                                <span className="ml-2 mr-2">{product.quantity}</span>
                                                <RiCloseLine />
                                            </span>
                                            <span className="py-2 px-3 text-center">
                                                {product.quantity * product.product.price}
                                            </span>
                                        </div>
                                        <h3 className="py-2 px-3 text-center">
                                            {product.quantity * product.product.price}
                                        </h3>
                                    </div>
                                ))
                            ) : (
                                <h3 colSpan="3" className="py-4 text-center">
                                    Loading...
                                </h3>
                            )}
                            <div className=" py-2 px-3 w-full  mt-5 ml flex justify-between border-b border-gray-200 items-center">
                                <span className="ml-5">Total</span>
                                <span className="mr-5">{total}</span>
                            </div>

                            {/* Payment Method Selection */}
                            <div className="mt-8 mb-6 ml-12 hover:table-fixed">
                                <label>
                                    <input
                                        type="radio"
                                        value="credit_card"
                                        checked={paymentMethod === "credit_card"}
                                        onChange={() => handlePaymentMethodChange("credit_card")}
                                        className="mr-2"
                                    />
                                    Credit Card
                                </label>
                            </div>

                            {/* CheckoutForm based on Payment Method */}
                            {paymentMethod === "credit_card" && (
                                <div className="mt-8 mb-6 ml-12 hover:table-fixed text-center">
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm
                                            fetchClientSecret={fetchClientSecret}
                                            clientSecret={clientSecret}
                                            formData={formData}
                                        />
                                    </Elements>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
