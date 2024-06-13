import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";

export default function SingleProduct({ auth }) {
    const { user } = auth;
    const [productDetails, setProductDetails] = useState(null);

    const getIdFromUrl = () => {
        const urlParts = window.location.pathname.split("/");
        return urlParts[urlParts.length - 1];
    };

    const productId = getIdFromUrl();
    const handleAddClick = async (product) => {
        
            const raw = {
                product_id: product.id,
                user_id:user.id,
              
            };
    console.log(raw ,"raw")
            try {
                const res = await axios.post("/api/addtocard", raw);
                if (res.statusText != "OK") {
                    throw new Error("Failed to update category");
                }
                console.log(res ,"raw")
            } catch (error) {
                // Handle errors
                console.error("Error:", error);
            }
        };
   
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(
                    `/api/get/single/product/${productId}`
                );
                setProductDetails(response.data.success);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, []);

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight"></h2>
            }
        >
            <Head title="Single Product" />

            {productDetails ? (
                <div className=" pt-20 pb-20 flex justify-center max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="container">
                        <div className="max-w-full mx-auto">
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
                                                className="w-full h-80 mb-2"
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
                                                    {" "}
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
                                      ADD TO CARD
                                    </button>
                                    </div>
                                        </div>
                                        
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
