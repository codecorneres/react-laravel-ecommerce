const fetchCartProductCount = async (userId) => {
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Add Content-Type header
            },
            body: JSON.stringify({ userId }), // Convert userId to JSON string and include it in the body
        };
        
        const response = await fetch("/api/getCartCount", requestOptions);
        if (!response.ok) {
            throw new Error("Failed to fetch cart count");
        }

        const data = await response.json();
        const cartCount = data.cartCount;
        console.log(cartCount,'cartCount');
        return cartCount;
    } catch (error) {
        console.error("Error fetching cart count:", error);
        throw error; // Rethrow the error to handle it outside
    }
};

export default fetchCartProductCount;
