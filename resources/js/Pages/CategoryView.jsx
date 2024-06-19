import React, { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link } from '@inertiajs/react';
import categorydetail from "@/utils/categorydetail";
import AddCategoryModal from "@/Components/AddCategoryModal";
import EditModal from "@/Components/EditModal";
import DeleteModal from "@/Components/DeleteModal";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
export default function CategoryView({auth
   }) {
    const { user } = auth;
    const [CategoryDetails, setCategoryDetails] = useState([]);
    const [selectedCategory, setSelectedcategory] = useState(null);

    const fetchcategory = async () => {
        try {
            const categorydata = await categorydetail();
            setCategoryDetails(categorydata);
           
        } catch (error) {
            console.log("errorrr");
        }
    };
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    useEffect(() => {
        fetchcategory();
       
    }, []);
    const updateCategoryData = (data) => {
        // console.log(data ,"update data");
        setCategoryDetails(data)
    }
    const handleAddClick = () => {
        setShowAddCategoryModal(true); // Open the add modal
    };
    const handleEditClick = (category) => {
        setSelectedcategory(category);
        setShowEditModal(true);
    };

    const handleDeleteClick = (category) => {
        setSelectedcategory(category);
        setShowDeleteModal(true);
    };

    return (
       
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"></h2>}
        >
            <Head title="Category Page" />
        <div className="category-table pt-10 text-al pb-[220px]">
            <div className="container mx-auto px-4">
                <div className="">
                    <div className="max-w-full mx-auto gap-y-5">
                    <div className="btn-flex py-4">
                <div className="container">
                    <div className="flex justify-between ">
                        <div className="btn ml-1">
                            <Link
                                href={route("dashboard")}
                                className="py-2 px-4 inline-flex bg-blue-300  text-[#100707] rounded-md font-[700]"
                            >
                                Back
                            </Link>
                        </div>
                        <div className="hedding">
                            <h3 className=" text-2xl"> Category View</h3>
                        </div>
                        <div className="">
                            <button
                               onClick={handleAddClick}
                                className="py-2 px-4 inline-flex bg-blue-300  text-[#100707] rounded-md font-[700]"
                            >
                                + Add
                            </button>
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
                                        <tr className="bg-blue-300  text-base">
                                            <th className="py-4 px-3 w-64  font-semibold">
                                                Category Name
                                            </th>
                                            <th className="py-4 px-3 w-64 font-semibold">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CategoryDetails.map(category => (
                                            <tr key={category.id} className="border-x-[1px] border-gray-700 border-b-[1px]">
                                                <td className="w-64 text-center py-2 px-3 font-medium">{category.name}</td>
                                                <td className=" w-64 py-2 px-3 text-center font-medium">
                                                    <button
                                                        onClick={() =>
                                                            handleEditClick(
                                                                category
                                                            )
                                                        }
                                                        className="hover:table-fixed"
                                                    >
                                                        <MdEdit />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                category
                                                            )
                                                        }
                                                        className="hover:table-fixed"
                                                    >
                                                        <FaTrash />
                                                    </button>
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
         {/* Add Modal */}
         {showAddCategoryModal && (
                <AddCategoryModal
                    onClose={() => setShowAddCategoryModal(false)}
                    onSubmit={() => {
                        setShowAddCategoryModal(false);
                        fetchcategory()
                    }}
                />
            )}
            {/* Edit Modal */}
            {showEditModal && (
                <EditModal
                category={selectedCategory}
                    onClose={() => setShowEditModal(false)}
                    updateCategoryData={updateCategoryData}
                    onSubmit={() => {
                        setShowEditModal(false);
                        fetchcategory()
                    }}
                />
            )}
            {/* Delete Modal */}
            {showDeleteModal && (
                <DeleteModal
                    category={selectedCategory}
                      updateCategoryData={updateCategoryData}
                    onClose={() => setShowDeleteModal(false)}
                    onSubmit={() => {
                        setShowDeleteModal(false);
                        fetchcategory()
                    }}
                />
            )}
        </AuthenticatedLayout>
    );
}
