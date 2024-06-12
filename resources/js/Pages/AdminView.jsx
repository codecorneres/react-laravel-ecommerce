import React, { useState, useEffect } from "react";
import usersdetail from "@/utils/usersdetail";
export default function AdminView({
   }) {
    const [UserDetails, setUserDetails] = useState([]);
    const fetchUser = async () => {
        try {
            const userdata = await usersdetail();
            setUserDetails(userdata);
           
        } catch (error) {
            console.log("errorrr");
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div className="product-table pt-20 pb-[220px]">
            <div className="container">
                <div className="">
                    <div className="max-w-full mx-auto gap-y-5">
                        Welcome Admin
                        <div className="data-table-main">
                            <div className="data-table relative">
                               
                                <table
                                    border="1"
                                    className="border-[1px] border-black text-[#100707] w-full border-b-black"
                                >
                                    <thead>
                                        <tr className="bg-slate-400 text-base">
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
                                        {UserDetails.map(user => (
                                            <tr key={user.id} className="border-x-[1px] border-gray-700 border-b-[1px]">
                                                <td className="w-64 text-center py-2 px-3 font-medium">{user.name}</td>
                                                <td className="w-64 text-center py-2 px-3 font-medium">{user.email}</td>
                                                {/* Assuming user.role exists in your user object */}
                                                <td className="w-64 text-center py-2 px-3 font-medium">{user.role.name}</td>
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
    );
}
