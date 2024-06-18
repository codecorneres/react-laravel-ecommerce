import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { RxCross2 } from "react-icons/rx";
import fetchCartProductCount from "@/utils/fetchCartProductCount";
export default function ViewCart({ auth }) {
    const { user } = auth;
    const [productDetails, setProductDetails] = useState(null);
    const userId = user.id;
    const [AddtocartProductCount, setCartProductCount] = useState(0);
    const handleDelete = async (id) => {
        console.log(id);
        // Construct the request body with the edited region data
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        // Construct the request body
        const raw = {
            id: id,
            user_id:user.id,
        };
    
        const requestOptions = {
            headers: myHeaders,
            method: "POST",
            body: raw,
            redirect: "follow",
        };
        try {
        // Send the request with axios
        const res= await axios.post("/api/delete/cart", raw,requestOptions);
        if(res.statusText!="OK"){
            throw new Error("Failed to update category");
        }
            console.log("res:", res.data.Cart);
            setProductDetails(res.data.Cart);
             
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
                console.log(response.data.cartproduct);
                setProductDetails(response.data.cartproduct);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, []);
    const fetchCartCount = async () => {
        try {
            const CartCount = await fetchCartProductCount(user.id);
            setCartProductCount(CartCount);
            // console.log(CartCount);
           
        } catch (error) {
            console.log("errorrr");
        }
    };
    useEffect(() => {
        fetchCartCount();
    }, []);
    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight"></h2>
            }
            AddtocartProductCount={AddtocartProductCount}
        >
            <Head title="Product Page" />
            <div className="product-table pt-10 text-al pb-[220px] max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="container mx-auto px-4">
                    <div className="">
                        <div className="max-w-full mx-auto gap-y-5">
                            <div className="btn-flex py-4">
                                <div className="container">
                                    <div className="flex justify-between ">
                                        <div className="hedding">
                                            <h3 className="text-2xl">
                                                {" "}
                                                Cart View
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="data-table-main">
                                <div className="data-table relative">
                                    <table
                                        border="1"
                                        className="border-[1px] w-full "
                                    >
                                        <thead className="border-[1px] ">
                                            <tr className=" text-base">
                                                <th className="py-4 px-3 w-64  font-semibold"></th>
                                                <th className="py-4 px-3 w-64  font-semibold">
                                                    Product Name
                                                </th>
                                                <th className="py-4 px-3 w-64  font-semibold">
                                                    Price
                                                </th>
                                                <th className="py-4 px-3 w-64 font-semibold">
                                                    Quantity
                                                </th>
                                                <th className="py-4 px-3 w-64 font-semibold">
                                                    Subtotal
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productDetails ? (
                                                productDetails.map(
                                                    (product) => (
                                                        <tr
                                                            key={product.id}
                                                            className="border-x-[1px] border-b-[1px]"
                                                        >
                                                            <td className="w-64 flex justify-between text-center py-2 px-3 font-medium">
                                                               
                                                                    <div className="ml-12 items-center mt-10">
                                                                        <RxCross2 onClick={() => handleDelete(product.id)}/>
                                                                    </div>
                                                               
                                                                

                                                                <img
                                                                    src={`/storage/app/products_images/${product.product.image}`}
                                                                    alt={
                                                                        product
                                                                            .product
                                                                            .name
                                                                    }
                                                                    className="w-24 h-24 rounded-lg"
                                                                />
                                                            </td>
                                                            <td className="w-64 text-center py-2 px-3 font-medium">
                                                                {
                                                                    product
                                                                        .product
                                                                        .name
                                                                }
                                                            </td>
                                                            <td className="w-64 text-center py-2 px-3 font-medium">
                                                                {
                                                                    product
                                                                        .product
                                                                        .price
                                                                }
                                                            </td>
                                                            <td className="w-64 text-center py-2 px-3 font-medium">
                                                                {
                                                                    product.quantity
                                                                }
                                                            </td>
                                                            <td className="w-64 text-center py-2 px-3 font-medium">
                                                                {product.quantity *
                                                                    product
                                                                        .product
                                                                        .price}
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="text-center py-4"
                                                    >
                                                        Loading...
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
