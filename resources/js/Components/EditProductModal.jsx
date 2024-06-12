import React, { useState, useEffect } from "react";
import categorydetail from "@/utils/categorydetail";

const EditProductModal = ({ product, onClose, updateProductData }) => {
    const [Categorydetails, setCategory] = useState([]);
    const [editedProduct, setEditedProduct] = useState({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category_id: product.category_id,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [editingImage, setEditingImage] = useState(false);

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const categories = await categorydetail();
            setCategory(categories);
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    const handleEditSubmit = () => {
        const formData = new FormData();
        formData.append("id", editedProduct.id);
        formData.append("name", editedProduct.name);
        formData.append("price", editedProduct.price);
        formData.append("category_id", editedProduct.category_id);
        formData.append("image", editedProduct.image);
        // console.log(formData, editedProduct)

        // Make the API call to update the product
        fetch("/api/update/product", {
            method: "POST",
            body: formData,
        })
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditedProduct((prevState) => ({
            ...prevState,
            image: file,
        }));

        // Show image preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            // If no new image selected, keep showing the current image
            setImagePreview(`/storage/app/products_images/${editedProduct.image}`);
        }
    };

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="modal bg-white py-3 max-w-[400px] w-full ">
                <div className="modal-content max-w-4xl mx-auto sm:px-6 lg:px-8 gap-y-5">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Edit Product
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
                        <div className="field-single mb-4">
                            <label htmlFor="name">Product</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={editedProduct.name}
                                onChange={handleChange}
                                className="w-full rounded-md"
                            />
                        </div>
                        <div className="field-single">
                            <label htmlFor="category_id">Category:</label>
                            <select
                                name="category_id"
                                onChange={handleChange}
                                value={editedProduct.category_id}
                                className="w-full rounded-md"
                            >
                                <option value="">Select Category</option>
                                {Categorydetails.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field-single mb-4">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={editedProduct.price}
                                onChange={handleChange}
                                className="w-full rounded-md"
                            />
                        </div>
                        <div className="field-single mb-4">
                            {editingImage ? (
                                <div>
                                    <label htmlFor="image">New Image:</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleImageChange}
                                        className="w-full rounded-md"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label>Current Image:</label>
                                    <img
                                        src={`/storage/app/products_images/${editedProduct.image}`}
                                        alt={editedProduct.name}
                                        className="max-w-xs"
                                    />
                                    <button
                                        onClick={() => setEditingImage(true)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Change Image
                                    </button>
                                </div>
                            )}
                        </div>
                        {imagePreview && (
                            <div className="field-single mb-4">
                                <label>Image Preview:</label>
                                <img
                                    src={imagePreview}
                                    alt="Product"
                                    className="max-w-xs"
                                />
                            </div>
                        )}
                        <button
                            className="hover:table-fixed text-white border-2 h-10 w-20 border-slate-200 bg-blue-700 hover:bg-blue-800"
                            onClick={handleEditSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;
