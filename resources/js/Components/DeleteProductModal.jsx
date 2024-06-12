import React, { useState } from "react";

const DeleteProductModal = ({ product, onClose, updateProductData }) => {
    // Define a state to hold the edited region data
    const [editedProduct, setEditedProduct] = React.useState({
        id: product.id,
        product: product.name,
    });

    const handleDeleteSubmit = () => {
        // Construct the request body with the edited product data
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Construct the request body
        const raw = JSON.stringify({
            id: editedProduct.id,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        // Make the API call to update the product
        fetch("/api/delete/product", requestOptions)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to update product");
                }
                return res.json();
            })
            .then((data) => {
                updateProductData(data.product);
                onClose();
            })
            .catch((error) => {
                console.error("Error updating product:", error);
                // Handle error if needed (e.g., display error message)
            });
    };

    // Handle input changes for region data
    const handleChange = (e) => {
        const { name, value } = e.target;
        editedProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="modal bg-white py-3 max-w-[400px] w-full ">
                <div className="modal-content max-w-4xl mx-auto sm:px-6 lg:px-8 gap-y-5">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Delete product
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
                        {/* Display input fields for editing product data */}
                        <h3>Are you sure Delete product </h3>

                        {/* Buttons for submit and cancel actions */}
                        <button
                            className="hover:table-fixed bg-[#c73b3b] border-2 h-10 w-20"
                            onClick={handleDeleteSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductModal;
