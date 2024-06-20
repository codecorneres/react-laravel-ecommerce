import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import productsdetail from "@/utils/productsdetail";
import AddModal from "@/Components/AddModal";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import EditProductModal from "@/Components/EditProductModal";
import DeleteProductModal from "@/Components/DeleteProductModal";
export default function ProductView({ auth }) {
    const { user } = auth;
    const [ProductDetails, setProductDetails] = useState([]);
    const [selectedProduct, setSelectedproduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const productdata = await productsdetail();
            setProductDetails(productdata);
        } catch (error) {
            console.log("errorrr");
        }
    };
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const updateProductData = (data) => {
        // console.log(data ,"update data");
        setProductDetails(data)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const formData = new FormData();
            const file = event.target.files[0]; // Access the uploaded file correctly
    
            formData.append('file', file);
    
            const response = await fetch("/api/import/csv", {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("Failed to import CSV file");
            }
    
            const responseData = await response.json();
            console.log("CSV file imported successfully", responseData.product);
    
            // Optionally handle the product data here
            setProductDetails(responseData.product);
    
        } catch (error) {
            console.error("Error importing CSV file:", error);
            // Handle error if needed (e.g., display error message)
        }
    };
    
    
    
    useEffect(() => {
        fetchProducts();
    }, []);
    const handleAddClick = () => {
        setShowAddModal(true); // Open the add modal
    };
    const handleEditClick = (product) => {
        setSelectedproduct(product);
        setShowEditModal(true);// Open the edit modal
    };
    const handleDeleteClick = (product) => {
        setSelectedproduct(product);
        setShowDeleteModal(true);// Open the delete modal
    };
    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight"></h2>
            }
        >
            <Head title="Product Page" />
            <div className="product-table pt-10 text-al pb-[220px]">
                <div className="container mx-auto px-4">
                    <div className="">
                        <div className="max-w-full mx-auto gap-y-5">
                            <div className="btn-flex py-4">
                                <div className="container">
                                    <div className="flex justify-between ">
                                        <div className="btn ml-1">
                                            <form>
                                                <input
                                                    type="file"
                                                    name="file"
                                                    accept=".csv"
                                                    onChange={handleSubmit}
                                                />
                                            </form>
                                        </div>
                                        <div className="hedding">
                                            <h3 className=" text-2xl">
                                                {" "}
                                                Product View
                                            </h3>
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
                                                    Product Name
                                                </th>
                                                <th className="py-4 px-3 w-64  font-semibold">
                                                    Category Name
                                                </th>
                                                <th className="py-4 px-3 w-64  font-semibold">
                                                    Price
                                                </th>
                                                <th className="py-4 px-3 w-64 font-semibold">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ProductDetails.map((product) => (
                                                <tr
                                                    key={product.id}
                                                    className="border-x-[1px] border-gray-700 border-b-[1px]"
                                                >
                                                    <td className="w-64 text-center py-2 px-3 font-medium">
                                                        {" "}
                                                        <img
                                                            src={`/storage/app/products_images/${product.image}`}
                                                            alt={product.name}
                                                            className="w-12 h-12 rounded-full"
                                                        />
                                                        {product.name}
                                                    </td>
                                                    <td className="w-64 text-center py-2 px-3 font-medium">
                                                        {product.category.name}
                                                    </td>
                                                    {/* Assuming user.role exists in your user object */}
                                                    <td className="w-64 text-center py-2 px-3 font-medium">
                                                        {product.price}
                                                    </td>
                                                    <td className=" w-64 py-2 px-3 text-center font-medium">
                                                        <button
                                                            onClick={() =>
                                                                handleEditClick(
                                                                    product
                                                                )
                                                            }
                                                            className="hover:table-fixed"
                                                        >
                                                            <MdEdit />
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleDeleteClick(
                                                                    product
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
            {showAddModal && (
                <AddModal
                    onClose={() => setShowAddModal(false)}
                    onSubmit={() => {
                        setShowAddModal(false);
                    }}
                />
            )}
            {/* Edit Modal */}
            {showEditModal && (
                <EditProductModal
                    product={selectedProduct}
                    onClose={() => setShowEditModal(false)}
                    updateProductData={updateProductData}
                    onSubmit={() => {
                        setShowEditModal(false);
                        // fetchProducts();
                    }}
                />
            )}
            {/* Delete Modal */}
            {showDeleteModal && (
                <DeleteProductModal
                    product={selectedProduct}
                    onClose={() => setShowDeleteModal(false)}
                    updateProductData={updateProductData}
                    onSubmit={() => {
                        setShowDeleteModal(false);
                        fetchProducts();
                    }}
                />
            )}
        </AuthenticatedLayout>
    );
}
