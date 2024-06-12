import React, { useState, useEffect } from "react";
import categorydetail from "@/utils/categorydetail";
const AddModal = ({ onClose, onSubmit }) => {
  
    const [Categorydetails, setCategory] = useState([]);

    // Define state to hold the new product data
    const [newProduct, setNewProduct] = useState({
        name: "",
        category_id: "",
        price:"",
        image:null,
        size:"",
        color:"",
    });
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewProduct((prevState) => ({
            ...prevState,
            image: file,
        }));
    };
    // Handle input changes for new product data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleAddSubmit = (e) => {
        e.preventDefault();
       // Construct the request body with the new product data
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("category_id", newProduct.category_id);
        formData.append("price", newProduct.price);
        formData.append("image", newProduct.image);
        formData.append("size", newProduct.size);
        formData.append("color", newProduct.color);
        
        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow",
        };
        
        // Make the API call to add the new product
        fetch("/api/create/product", requestOptions)
            .then((response) => {
                console.log("product", response)
                if (!response.ok) {
                    throw new Error("Failed to add product");
                }
                window.location.reload();
                // If the addition is successful, close the modal and fetch products again
                onClose(); // Close the modal
                // fetchproducts(); // Assuming fetchproducts updates the products state
            })
            .catch((error) => {
                console.error("Error adding product:", error);
                // Handle error if needed (e.g., display error message)
            });
    };
    //Fetch all Category
    const fetchCategory = async () => {
        try {
            const Categorydetail = await categorydetail();
            setCategory(Categorydetail);
        } catch (error) {
            console.log("errorrr",error);
        }
    };
    useEffect(() => {
        fetchCategory();
    }, []);
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Call onSubmit prop function with new product data
        onSubmit(newProduct);
    };
 
    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="modal bg-white py-3 max-w-[400px] w-full ">
                <div className="modal-content max-w-4xl mx-auto sm:px-6 lg:px-8 gap-y-5">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Add product
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

                        <form onSubmit={handleAddSubmit}>
                            <div className="field-single mb-4">
                                <label
                                    htmlFor="name"
                                    className="mb-2 w-full block"
                                >
                                    Product Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md"
                                />
                            </div>
                            <div className="field-single">
                                <label
                                    htmlFor="category_id"
                                    className="mb-2 w-full block"
                                >
                                    Category:
                                </label>
                                <select
                                name="category_id"
                                className="mb-2 w-full block"
                                onChange={handleChange} // Add onChange event handler
                                value={newProduct.category_id} // Set value to state
                            >
                                <option value="all">All category</option>
                                {Categorydetails.map((Category) => (
                                    <option
                                        key={Category.id}
                                        value={Category.id}
                                    >
                                        {Category.name}
                                    </option>
                                ))}
                            </select>
                            </div>
                            <div className="field-single">
                            <label
                                    htmlFor="price"
                                    className="mb-2 w-full block"
                                >
                                    Price:
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md"
                                />
                            </div>
                            <div className="field-single">
                            <label
                                    htmlFor="image"
                                    className="mb-2 w-full block"
                                >
                                    Image:
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleFileChange}
                                    required
                                    className="w-full rounded-md"
                                />
                            </div>
                            <div className="field-single">
                            <label
                                    htmlFor="size"
                                    className="mb-2 w-full block"
                                >
                                    Size:
                                </label>
                                <input
                                    type="text"
                                    id="size"
                                    name="size"
                                    value={newProduct.size}
                                    onChange={handleChange}
                                    className="w-full rounded-md"
                                />
                            </div>
                            <div className="field-single">
                            <label
                                    htmlFor="color"
                                    className="mb-2 w-full block"
                                >
                                    Color:
                                </label>
                                <input
                                    type="text"
                                    id="color"
                                    name="color"
                                    value={newProduct.color}
                                    onChange={handleChange}
                                    className="w-full rounded-md"
                                />
                            </div>
                            <button
                                type="submit"
                                className="hover:table-fixed text-white  border-2 h-10 w-20 border-slate-200 bg-blue-700 hover:bg-blue-800"
                            >
                                Submit
                            </button>
                            {/* <button type="button" className="hover:table-fixed text-white border-2 border-slate-200" onClick={onClose}>Cancel</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddModal;
