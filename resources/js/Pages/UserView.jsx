
import { useState, useEffect } from 'react';
import productsdetail from "@/utils/productsdetail";
import categorydetail from "@/utils/categorydetail";
export default function UserView() {
    const [productDetails, setProductDetails] = useState([]);
    const [CategoryDetails, setCategoryDetails] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); // Initialize state variable

    const handleFilterChange = (categoryId) => {
        setSelectedCategory(categoryId)
        fetchProductsByCategory(categoryId); 
    };

    const fetchProduct = async () => {
        try {
            const productData = await productsdetail();
            setProductDetails(productData);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };
    const fetchcategory = async () => {
        try {
            const categorydata = await categorydetail();
            setCategoryDetails(categorydata);
           
        } catch (error) {
            console.log("errorrr");
        }
    };
    const fetchProductsByCategory = async (categoryId) => {
        const raw = {
            category_id: categoryId,
        };

        try {
            const res = await axios.post("/api/filter/product", raw);
            if (res.statusText != "OK") {
                throw new Error("Failed to update category");
            }
            setProductDetails(res.data.success);
        } catch (error) {
            // Handle errors
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        fetchProduct();
        fetchcategory();
    }, []);

    return (
        <div className="flex flex-wrap gap-y-6 -mx-3">
                
                <div className="max-w-48 w-full px-3 ">
                <select
                name="category_selector"
                className="categorys-selector w-full bg-chevron-down-el bg-chevron-down-el-center-right bg-[length:12px] font-normal py-[12px] ps-6 border-gray-600 text-base rounded-lg focus:ring-0 focus:border-gray-500"
                onChange={(e) => handleFilterChange(e.target.value)} // Pass category ID directly to handleFilterChange
                value={selectedCategory} // Set value to state
            >
                <option value="">All Category</option>
                {CategoryDetails.map((CategoryDetail) => (
                    <option key={CategoryDetail.id} value={CategoryDetail.id}>
                        {CategoryDetail.name}
                    </option>
                ))}
                {/* Add other options dynamically */}
            </select>
                </div>
                
          
        <div className="product-table pt-20 pb-[220px]">
            
            <div className="container">
                <div className="">
                    <div className="max-w-full mx-auto gap-y-5">
                        <div className="grid grid-cols-3 gap-4">
                            {productDetails.map((product, index) => (
                                <div key={index} className="border p-4">
                                    <img
                                        src={`/storage/app/products_images/${product.image}`}
                                        alt={product.name}
                                        className="w-full mb-2"
                                    />
                                    <h2 className="text-lg font-bold">
                                        {product.name}
                                    </h2>
                                    <p>Price: {product.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
