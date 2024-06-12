
import { useState, useEffect } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import productsdetail from "@/utils/productsdetail";
import categorydetail from "@/utils/categorydetail";
export default function SingleProduct({ auth }) {
    const { user } = auth;
    

    return (
        <AuthenticatedLayout
        user={user}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight"></h2>
        }
    >
        <Head title="Product Page" />
                <h2>single product</h2>
 
    </ AuthenticatedLayout>
    );
}
