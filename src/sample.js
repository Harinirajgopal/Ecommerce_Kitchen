import React, { useState } from 'react';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  
  const addItem = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem && existingItem.quantity > 1) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
      setCart(updatedCart);
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} - Quantity: {item.quantity}
            <button onClick={() => addItem(item)}>+</button>
            <button onClick={() => removeItem(item)}>-</button>
          </li>
        ))}
      </ul>
      <p>Total: ${getTotal()}</p>
    </div>
  );
};

export default ShoppingCart;
