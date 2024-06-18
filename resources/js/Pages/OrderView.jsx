import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import orderdetail from "@/utils/orderdetails";


export default function OrderView({ auth }) {
    const { user } = auth;
    const [OrderDetails, setOrderDetails] = useState([]);

    const fetchOrders = async () => {
        try {
            const productdata = await orderdetail();
            setOrderDetails(productdata);
        } catch (error) {
            console.log("errorrr");
        }
    };
    

    useEffect(() => {
        fetchOrders();
    }, []);
  
    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight"></h2>
            }
        >
            <Head title="Order Page" />
            <div className="product-table pt-10 text-al pb-[220px]">
                <div className="container mx-auto px-4">
                    <div className="">
                        <div className="max-w-full mx-auto gap-y-5">
                            <div className="btn-flex py-4">
                                <div className="container">
                                    <div className="flex justify-between ">
                                        <div className="hedding">
                                            <h3 className=" text-2xl">
                                                {" "}
                                                Order View
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="data-table-main">
                                <div className="data-table relative">
                                    <table
                                        border="1"
                                        className="border-[1px] border-black text-[#100707] w-full border-b-black"
                                    >
                                        <thead>
                                            <tr className="bg-slate-400 text-base">
                                                <th className="py-4 px-3 w-64  font-semibold">
                                                    Order Name
                                                </th>
                                                <th className="py-4 px-3 w-64  font-semibold">
                                                    Category Name
                                                </th>
                                                <th className="py-4 px-3 w-64  font-semibold">
                                                    Price
                                                </th>
                                                <th className="py-4 px-3 w-64  font-semibold">
                                                Quantity
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {OrderDetails.map((order) => (
                                                <tr
                                                    key={order.id}
                                                    className="border-x-[1px] border-gray-700 border-b-[1px]"
                                                >
                                                    <td className="w-64 text-center py-2 px-3 font-medium">
                                                        {order.id}
                                                    </td>
                                                    <td className="w-64 text-center py-2 px-3 font-medium">
                                                        {order.status}
                                                    </td>
                                                    <td className="w-64 text-center py-2 px-3 font-medium">
                                                        {order.payment_method}
                                                    </td>
                                                    <td className="w-64 text-center py-2 px-3 font-medium">
                                                        <ul>
                                                            {order.products.map(
                                                                (product) => (
                                                                    <li
                                                                        key={
                                                                            product.product_id
                                                                        }
                                                                    >
                                                                       
                                                                        {
                                                                            product.quantity
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))}
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
