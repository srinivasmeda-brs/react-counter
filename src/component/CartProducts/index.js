import React from 'react';
import './index.css';  // Import the CSS file

const CartProducts = (props) => {
    const { each, increment, decrement, deleteItem } = props;
    const { id, count } = each;

    const onIncrement = () => {
        increment(id);
    };

    const onDecrement = () => {
        decrement(id);
    };

    const onDelete = () => {
        deleteItem(id);
    };

    return (
        <li className="cart-product-item">
            <span className="count">{count}</span>
            <div>
                <button onClick={onIncrement}>+</button>
                <button onClick={onDecrement}>-</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </li>
    );
};

export default CartProducts;
