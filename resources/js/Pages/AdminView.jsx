import React, { useState, useEffect } from "react";
import usersdetail from "@/utils/usersdetail";
import AddUserModal from "@/Components/AddUserModal";
export default function AdminView({}) {
    const [UserDetails, setUserDetails] = useState([]);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

    const fetchUser = async () => {
        try {
            const userdata = await usersdetail();
            setUserDetails(userdata);
        } catch (error) {
            console.log("errorrr");
        }
    };
    const handleAddClick = () => {
        setShowAddCategoryModal(true); // Open the add modal
    };
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="product-table pt-20 pb-[220px]">
                    <div className="container">
                        <div className="">
                            <div className="max-w-full mx-auto gap-y-5">
                                <div className="data-table-main">
                                    <div className="data-table relative">
                                        <div className="add-button mb-2">
                                            <button
                                                onClick={handleAddClick}
                                                className="py-2 px-4 inline-flex bg-blue-300  text-[#100707] rounded-md font-[700]"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                        <table
                                            border="1"
                                            className="border-[1px] border-black text-[#100707] w-full border-b-black"
                                        >
                                            <thead>
                                                <tr className="bg-blue-300  text-base">
                                                    <th className="py-4 px-3 w-64  font-semibold">
                                                        User Name
                                                    </th>
                                                    <th className="py-4 px-3 w-64  font-semibold">
                                                        Email
                                                    </th>
                                                    <th className="py-4 px-3 w-64  font-semibold">
                                                        Role
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {UserDetails.map((user) => (
                                                    <tr
                                                        key={user.id}
                                                        className="border-x-[1px] border-gray-700 border-b-[1px]"
                                                    >
                                                        <td className="w-64 text-center py-2 px-3 font-medium">
                                                            {user.name}
                                                        </td>
                                                        <td className="w-64 text-center py-2 px-3 font-medium">
                                                            {user.email}
                                                        </td>
                                                        {/* Assuming user.role exists in your user object */}
                                                        <td className="w-64 text-center py-2 px-3 font-medium">
                                                            {user.role.name}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {/* Add Modal */}
                                        {showAddCategoryModal && (
                                            <AddUserModal
                                                onClose={() =>
                                                    setShowAddCategoryModal(
                                                        false
                                                    )
                                                }
                                                onSubmit={() => {
                                                    setShowAddCategoryModal(
                                                        false
                                                    );
                                                    fetchUser();
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
