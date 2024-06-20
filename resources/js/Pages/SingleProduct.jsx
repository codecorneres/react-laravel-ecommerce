import { useState, useEffect } from "react";
import Rating from 'react-rating-stars-component';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import fetchCartProductCount from "@/utils/fetchCartProductCount";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function SingleProduct({ auth }) {
    const { user } = auth;
    const [productDetails, setProductDetails] = useState(null);
    const [reviewDetails, setReviewDetails] = useState(null);
    const [AddtocartProductCount, setCartProductCount] = useState(0);
    const [activeTab, setActiveTab] = useState("description");

    const [rating, setRating] = useState(0); // State for rating
    const [review, setReview] = useState(""); // State for review
    const [name, setName] = useState(""); // State for name
    const [email, setEmail] = useState(""); // State for email

    const getIdFromUrl = () => {
        const urlParts = window.location.pathname.split("/");
        return urlParts[urlParts.length - 1];
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

    const productId = getIdFromUrl();
    const formData = {
        productId: productId, // Include product ID if needed
    };
  
    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`/api/get/single/product/${productId}`);
            setProductDetails(response.data.success);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };
    const fetchReviewDetails = async () => {
        try {
            const response = await axios.post("/api/get/review",formData);
            console.log(response.data.success,'response');
            setReviewDetails(response.data.success);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };
    const raw = {
        product_id: productId, // Include product ID if needed
        user_id:user.id,
    };
    const handleAddClick = async (product) => {
        try {
            // Example of adding product to cart (send request to backend)
            const response = await axios.post("/api/addtocart", raw);
            // Update cart count locally
            setCartProductCount(prevCount => prevCount + 1);
            console.log("Product added to cart:", response.data);
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };
    useEffect(() => {
        fetchProductDetails();
        fetchReviewDetails();
    }, []);

    const toggleTab = (tab) => {
        setActiveTab(tab);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform submission logic here, e.g., send data to backend
        const formData = {
            rating: rating,
            review: review,
            name: name,
            email: email,
            productId: productId, // Include product ID if needed
            userId: user.id
        };
        
        try {
            // Example of submitting data to backend
            const res = await axios.post("/api/add/review", formData);
           

            console.log("Review submitted successfully:", res.data.review);
            // Optionally, reset form fields or update UI after submission
            setRating(0);
            setReview("");
            setName("");
            setEmail("");
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };
    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight"></h2>
            }
            AddtocartProductCount={AddtocartProductCount}
            fetchCartCount={fetchCartCount}
        >
            <Head title="Single Product" />

            {productDetails ? (
                <div className="pt-20 pb-20 flex justify-center max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="container">
                        <div className="max-w-full mx-auto mb-20">
                            {productDetails.map((product) => (
                                <div
                                    key={product.id}
                                    className="grid grid-cols-1 sm:grid-cols-1 gap-4"
                                >
                                    <div className="flex">
                                        <div className="w-1/2 flex justify-center">
                                            <img
                                                src={`/storage/app/products_images/${product.image}`}
                                                alt={product.name}
                                                className="w-full h-full mb-2"
                                            />
                                        </div>

                                        <div className="w-1/2 ml-12">
                                            <p className="font-bold text-2xl">
                                                {product.name}
                                            </p>
                                            <div className="flex justify-between mt-2">
                                                <p className="text-sm text-gray-600">
                                                    Home / Men / DNK Yellow
                                                    Shoes
                                                </p>
                                            </div>
                                            <div className="flex mt-2">
                                                <p className="font-bold text-2xl">
                                                    ${product.price}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    + Free Shipping
                                                </p>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <p className="text-sm text-gray-600">
                                                    Nam nec tellus a odio
                                                    tincidunt auctor a ornare
                                                    odio. Sed non mauris vitae
                                                    erat consequat auctor eu in
                                                    elit. Class aptent taciti
                                                    sociosqu ad litora torquent
                                                    per conubia nostra, per
                                                    inceptos himenaeos. Mauris
                                                    in erat justo. Nullam ac
                                                    urna eu felis dapibus
                                                    condimentum sit amet a
                                                    augue. Sed non neque elit
                                                    sed.
                                                </p>
                                            </div>
                                            <div className="flex justify-between mt-6">
                                                <button
                                                    onClick={() =>
                                                        handleAddClick(product)
                                                    }
                                                    className="hover:table-fixed bg-blue-400 w-48 h-10 rounded-lg"
                                                >
                                                    ADD TO CART
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-10 border-t-[1px] text-[#100707] w-full flex">
                                        <p
                                            className={`text-xl mt-5 font-bold cursor-pointer ${
                                                activeTab === "description"
                                                    ? "text-blue-500"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                toggleTab("description")
                                            }
                                        >
                                            Description
                                        </p>
                                        <p
                                            className={`text-xl mt-5 font-bold ml-10 cursor-pointer ${
                                                activeTab === "additionalInfo"
                                                    ? "text-blue-500"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                toggleTab("additionalInfo")
                                            }
                                        >
                                            Additional information
                                        </p>
                                        <p
                                            className={`text-xl mt-5 font-bold ml-10 cursor-pointer ${
                                                activeTab === "reviews"
                                                    ? "text-blue-500"
                                                    : ""
                                            }`}
                                            onClick={() => toggleTab("reviews")}
                                        >
                                            Reviews
                                        </p>
                                    </div>
                                    <div className="mt-6">
                                        {activeTab === "description" && (
                                            <div>
                                                <p className="font-bold mt-10 text-2xl  mb-10">
                                                    Product Description:
                                                </p>
                                                <p className="text-lg text-gray-600">
                                                    Since it’s creation lorem
                                                    ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit, sed do eiusmod tempor
                                                    incididunt ut labore et
                                                    dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis
                                                    nostrud exercitation ullamco
                                                    laboris nisi ut aliquip ex
                                                    ea commodo consequat. Duis
                                                    aute irure dolor in
                                                    reprehenderit in voluptate
                                                    velit esse cillum dolore eu
                                                    fugiat nulla pariatur.
                                                    Excepteur sint occaecat
                                                    cupidatat non proident, sunt
                                                    in culpa qui officia
                                                    deserunt mollit anim id est
                                                    laborum. Duis aute irure
                                                    dolor in reprehenderit in
                                                    voluptate velit esse cillum
                                                    dolore eu fugiat nulla
                                                    pariatur. Excepteur sint
                                                    occaecat cupidatat non
                                                    proident.
                                                </p>
                                                <p className="text-lg mt-10 text-gray-600 ">
                                                    Since it’s creation lorem
                                                    ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit, sed do eiusmod tempor
                                                    incididunt ut labore et
                                                    dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis
                                                    nostrud exercitation ullamco
                                                    laboris nisi ut aliquip ex
                                                    ea commodo consequat. Duis
                                                    aute irure dolor in
                                                    reprehenderit in voluptate
                                                    velit esse cillum dolore eu
                                                    fugiat nulla pariatur.
                                                    Excepteur sint occaecat
                                                    cupidatat non proident, sunt
                                                    in culpa qui officia
                                                    deserunt mollit anim id est
                                                    laborum. Duis aute irure
                                                    dolor in reprehenderit in
                                                    voluptate velit esse cillum
                                                    dolore eu fugiat nulla
                                                    pariatur. Excepteur sint
                                                    occaecat cupidatat non
                                                    proident.
                                                </p>
                                                <img
                                                    src={`https://i.ytimg.com/vi/f64GdOxJjPE/maxresdefault.jpg`}
                                                    className="w-full mt-10 h-full mb-2"
                                                />
                                            </div>
                                        )}
                                        {activeTab === "additionalInfo" && (
                                            <div>
                                                <table className="mt-4 border-[1px] w-full">
                                                    <thead className=" border-[1px] h-16">
                                                        <tr>
                                                            <td className="w-48 px-4 border-[1px]">
                                                                Color
                                                            </td>
                                                            <td className="px-2">
                                                                {product.color}
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=" border-[1px] h-16">
                                                        <tr>
                                                            <td className="w-48 px-4 border-[1px]">
                                                                Size
                                                            </td>
                                                            <td className="px-2">
                                                                {product.size}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                        {activeTab === "reviews" && (
                                            <div>
                                                {reviewDetails === null ? (
                                                    <div>
                                                        <p className="text-lg mt-4">
                                                            There are no reviews
                                                            yet.
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {/* Render reviews here based on reviewDetails */}
                                                        {reviewDetails.map(
                                                            (review, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="border-b">
                                                                    <p className="text-lg mt-5">
                                                                    {
                                                                            review.name
                                                                        }
                                                                          </p>
                                                                          <Rating
                                                                        count={
                                                                            5
                                                                        }
                                                                        size={
                                                                            24
                                                                        }
                                                                        value={
                                                                            review.rating
                                                                        }
                                                                        activeColor="#ffd700"
                                                                        className="pointer-events-none opacity-50" // Apply CSS classes to make it non-clickable
                                                                    /><p>
                                                                         {
                                                                            review.review
                                                                        }
                                                                    </p>
                                                                    
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}

                                                <div className="mt-10 border-[1px] text-[#100707] w-full ">
                                                    <p className=" mt-10 ml-10 text-xl">
                                                        Be the first to review ”
                                                        {product.name}”
                                                    </p>
                                                    <p className="text-sm ml-10 text-gray-600 ">
                                                        Your email address will
                                                        not be published.
                                                        Required fields are
                                                        marked *
                                                    </p>
                                                    <form
                                                        className="mt-1 py-5 px-10"
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <div className="mt-4">
                                                            <label>
                                                                Your rating *
                                                            </label>
                                                            <Rating
                                                                count={5}
                                                                size={24}
                                                                value={rating}
                                                                onChange={
                                                                    handleRatingChange
                                                                }
                                                                activeColor="#ffd700"
                                                            />
                                                        </div>
                                                        <div className="mt-4">
                                                            <InputLabel
                                                                htmlFor="review"
                                                                value="Your review *"
                                                            />
                                                            <TextInput
                                                                id="review"
                                                                name="review"
                                                                value={review}
                                                                onChange={(e) =>
                                                                    setReview(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="mt-1 block w-full h-24"
                                                                autoComplete="review"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mt-4">
                                                            <InputLabel
                                                                htmlFor="name"
                                                                value="Name"
                                                            />
                                                            <TextInput
                                                                id="name"
                                                                name="name"
                                                                value={name}
                                                                onChange={(e) =>
                                                                    setName(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="mt-1 block w-full"
                                                                autoComplete="name"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mt-4">
                                                            <InputLabel
                                                                htmlFor="email"
                                                                value="Email"
                                                            />
                                                            <TextInput
                                                                id="email"
                                                                type="email"
                                                                name="email"
                                                                value={email}
                                                                onChange={(e) =>
                                                                    setEmail(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="mt-1 block w-full"
                                                                autoComplete="email"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex items-center justify-end mt-4">
                                                            <button
                                                                type="submit"
                                                                className="hover:table-fixed text-white border-2 h-10 w-20 border-slate-200 bg-blue-700 hover:bg-blue-800"
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </AuthenticatedLayout>
    );
}
