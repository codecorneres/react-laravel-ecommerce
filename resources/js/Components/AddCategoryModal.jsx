import React, { useState } from "react";
const AddCategoryModal = ({ onClose, onSubmit }) => {
   

    // Define state to hold the new category data
    const [newCategory, setNewCategory] = useState({
        name: "",
    });

    // Handle input changes for new Category data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleAddSubmit = () => {
        // Construct the request body with the new Category data
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Construct the request body with the new Category data
        const raw = JSON.stringify({
            name: newCategory.name,
            category_id: newCategory.category_id,
            price:newCategory.price
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        // Make the API call to add the new Category
        fetch("/api/create/category", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add category");
                }
                // If the addition is successful, close the modal and fetch categorys again
                onClose(); // Close the modal
                fetchCategory(); // Assuming fetchcategorys updates the categorys state
            })
            .catch((error) => {
                console.error("Error adding category:", error);
                // Handle error if needed (e.g., display error message)
            });
    };
   
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Call onSubmit prop function with new category data
        onSubmit(newCategory);
    };

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="modal bg-white py-3 max-w-[400px] w-full ">
                <div className="modal-content max-w-4xl mx-auto sm:px-6 lg:px-8 gap-y-5">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Add category
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
                                    Category Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newCategory.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md"
                                />
                            </div>


                            <button
                                type="submit"
                                className="hover:table-fixed text-white border-2 h-10 w-20 border-slate-200 bg-blue-700 hover:bg-blue-800"
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

export default AddCategoryModal;
