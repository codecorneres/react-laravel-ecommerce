import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const CartModal = ({ userId, onClose }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch cart items based on the user ID when the modal opens
        const fetchCartItems = async () => {
            setIsLoading(true);
            try {
                // Fetch cart items using userId
                const response = await fetch(`/api/cart/${userId}`); // Example API endpoint
                const data = await response.json();
                setCartItems(data.cartItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, [userId]);

    return (
        <Modal open onClose={onClose} center>
            <h2>Shopping Cart</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    {item.name} - ${item.price}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </Modal>
    );
};

export default CartModal;
