import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

const AddUserModal = ({ onClose, onSubmit }) => {
    // State to hold the new user data
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Handle input changes for new User data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleAddSubmit = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(newUser),
            redirect: "follow",
        };

        fetch("/api/add/user", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add user");
                }
                return response.json();
            })
            .then((data) => {
                // console.log("User added successfully:", data);
                onClose(); // Close the modal
                onSubmit(newUser); // Pass new user data to parent component
            })
            .catch((error) => {
                console.error("Error adding user:", error);
                // Handle error if needed (e.g., display error message)
            });
    };

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="modal bg-white py-3 max-w-[400px] w-full">
                <div className="modal-content max-w-4xl mx-auto sm:px-6 lg:px-8 gap-y-5">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Add User
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
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={newUser.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={newUser.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={newUser.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <button
                                    type="submit"
                                    className="hover:table-fixed text-white border-2 h-10 w-20 border-slate-200 bg-blue-700 hover:bg-blue-800"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
