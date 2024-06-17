import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { RiCloseLine } from "react-icons/ri";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CheckoutForm from "@/Components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe from @stripe/stripe-js

const stripePromise = loadStripe(
  "pk_test_51PSZRI03ltyGto8gSHT6SmdpZwfpiXzPJ7ym5Feio8vwpOlzvl5rkYKwP19JeVcZUBrO1js9GYRmTeC2FAjAMcuj00L2Vdlfdr" // Replace with your actual publishable key
);

export default function Checkout({ auth }) {
  const { user } = auth;
  const [productDetails, setProductDetails] = useState(null);
  const [total, setTotal] = useState(0);
  const userId = user.id;

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

  const handleDelete = async (id) => {
    try {
      await axios.post("/api/delete/cart", { id, user_id: user.id });
      fetchProductDetails(); // Update product details after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <AuthenticatedLayout
      user={user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"></h2>}
    >
      <Head title="Checkout" />
      <div className="container mx-auto px-4 pt-10 pb-[220px] sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <div className=" mt-12 grid grid-cols-2">
          <div className="data-table relative "></div>
          <div className=" relative border border-gray-200">
            <p className="py-2 px-3 w-full text-2xl font-semibold mt-10 ml-5 ">Your order</p>

            <div className="w-full">
              <div className=" py-2 px-3 w-full font-semibold mt-10 flex justify-between border-b border-gray-200">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              {productDetails ? (
                productDetails.map((product, index) => (
                  <div key={index} className="py-2 px-3 flex  justify-between">
                    <div
                      key={index}
                      className="py-2 px-3 flex items-center justify-between"
                    >
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
              <div className="flex justify-end mt-4">
                <div className="text-xl font-semibold">Total: ${total}</div>
              </div>

              {/* Integration of CheckoutForm */}
              <div className="mt-8 mb-6 ml-12 hover:table-fixed text-center  bg-blue-400 w-4/5 h-10 rounded-lg">
                <CheckoutForm stripePromise={stripePromise} />
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
