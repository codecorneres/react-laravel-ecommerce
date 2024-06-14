import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AdminView from "@/Pages/AdminView";
import UserView from "@/Pages/UserView";
import ProductView from "./ProductView";

export default function Dashboard({ auth }) {
    const { user } = auth;

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight"></h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 overflow-y-hidden">
                {/* Conditionally render AdminView based on role_id */}
                {user.role_id === 1 ? <AdminView /> : <UserView />}
            </div>
        </AuthenticatedLayout>
    );
}
