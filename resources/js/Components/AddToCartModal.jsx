import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const AddToCartModal = ({ userId, onClose, fetchCartCount }) => {
    const [productDetails, setProductDetails] = useState(null);
    const [total, setTotal] = useState(0);
    const handleDelete = async (id) => {
    
        // Construct the request body with the edited region data
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Construct the request body
        const raw = {
            id: id,
            user_id: userId,
        };

        const requestOptions = {
            headers: myHeaders,
            method: "POST",
            body: raw,
            redirect: "follow",
        };
        try {
            // Send the request with axios
            const res = await axios.post(
                "/api/delete/cart",
                raw,
                requestOptions
            );
            if (res.statusText != "OK") {
                throw new Error("Failed to update category");
            }
            // console.log("res:", res.data.Cart, "setProduct");
            setProductDetails(res.data.Cart);
            fetchCartCount();
        } catch (error) {
            // Handle errors
            console.error("Error:", error);
        }
    };
   
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(
                    `/api/get/cart/product/${userId}`
                );
                // console.log(response.data.cartproduct, "setProductDetails");
                setProductDetails(response.data.cartproduct);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
      
    }, []);
    useEffect(() => {
        // Update total when productDetails changes
        setTotal(calculateTotal());
    }, [productDetails]);

    const calculateTotal = () => {
        let sum = 0;
        if (productDetails) {
            productDetails.forEach((product) => {
                sum += product.quantity * product.product.price;
            });
        }
        return sum;
    };
    return (
        <div className="overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 flex items-center justify-end bg-black bg-opacity-50">
            <div className="modal bg-white py-3 max-w-[600px] w-full h-screen ">
                <div className="modal-content max-w-4xl mx-auto sm:px-6 lg:px-8 gap-y-5">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold mt-10  text-gray-900">
                                Shopping Cart
                            </h3>
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-10">
                        {productDetails ? (
                            productDetails.map((product) => (
                                <div
                                    key={product.id}
                                    className="grid grid-cols-1 sm:grid-cols-1 gap-4 flex border-b-[1px]"
                                >
                                    <div className="flex">
                                        <div className="flex justify-center">
                                            <img
                                                src={`/storage/app/products_images/${product.product.image}`}
                                                alt={product.product.name}
                                                className="w-14 h-14  mt-2 mb-4"
                                            />
                                        </div>
                                        <div className="w-full ml-2 mt-2">
                                            <p className="flex justify-between items-right">
                                                <span>
                                                    {product.product.name}
                                                </span>
                                                <span className="mt-1">
                                                    <RxCross2
                                                        onClick={() =>
                                                            handleDelete(
                                                                product.id
                                                            )
                                                        }
                                                    />
                                                </span>
                                            </p>

                                            <div className="flex">
                                                <p> {product.quantity}</p>
                                                <p className="mt-1">
                                                    <RxCross2 />
                                                </p>
                                                <p className=" text-gray-600">
                                                    {product.product.price}
                                                </p>
                                            </div>
                                            <div className="flex">
                                                <p className="flex justify-between items-right">
                                                    <span className="mt-1"></span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div>
                <div className="flex grid grid-cols-1 sm:grid-cols-1 gap-4  border-b-[1px]  h-16 mt-5">
                    <div className="flex justify-between items-right">
                        <p className="ml-6">
                            <span className="mt-1">Subtotal</span>
                        </p>

                        <p className="mr-6">
                            <span className="mt-1">{total} </span>
                        </p>
                    </div>
                </div>
                <div className="py-10 flex justify-center">
                    <Link
                        href={`/view/cart/${userId}`}
                        className="hover:table-fixed text-center  bg-blue-400 w-4/5 h-10 rounded-lg"
                    >
                        <span className="">VIEW CART </span>
                    </Link>
                    
                </div>
                <div className="flex justify-center">
                <Link
                        href={`/checkout`}
                        className="hover:table-fixed text-center  bg-blue-400 w-4/5 h-10 rounded-lg"
                    >
                        <span className="">Checkout </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddToCartModal;
