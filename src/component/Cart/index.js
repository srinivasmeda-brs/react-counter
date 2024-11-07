import { Component } from "react";
import CartProducts from "../CartProducts";
import './index.css';

const initialData = [
    { id: 1, count: 0, product: true },
    { id: 2, count: 0, product: true },
    { id: 3, count: 0, product: true },
    { id: 4, count: 0, product: true }
];

class Cart extends Component {
    state = { data: initialData, productCount: 0 };

    increment = (id) => {
        this.setState((prevState) => {
            let updatedProductCount = prevState.productCount;
            const updatedData = prevState.data.map((item) => {
                if (item.id === id) {
                    if (item.product === true) {
                        updatedProductCount += 1;
                        return { ...item, count: item.count + 1, product: false };
                    }
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
            return { data: updatedData, productCount: updatedProductCount };
        });
    };

    decrement = (id) => {
        this.setState((prevState) => {
            let updatedProductCount = prevState.productCount;
            const updatedData = prevState.data.map((item) => {
                if (item.id === id && item.count > 0) {
                    const newCount = item.count - 1;
                    if (newCount === 0 && item.product === false) {
                        updatedProductCount -= 1;
                        return { ...item, count: newCount, product: true };
                    }
                    return { ...item, count: newCount };
                }
                return item;
            });
            return { data: updatedData, productCount: updatedProductCount };
        });
    };

    deleteItem = (id) => {
        this.setState((prevState) => {
            const updatedData = prevState.data.filter((each) => each.id !== id);
            const deletedItem = prevState.data.find((item) => item.id === id);
            let updatedProductCount = prevState.productCount;
            if (prevState.productCount === 0) {
                console.log("We don't want count to be negative");
            } else if (deletedItem && deletedItem.product) {
                updatedProductCount -= 1;
            }
            return {
                data: updatedData,
                productCount: updatedProductCount
            };
        });
    };

    render() {
        const { data, productCount } = this.state;
        return (
            <div className="cart-container">
                <h1 className="cart-header">Cart ({productCount})</h1>
                <ul className="cart-list">
                    {data.map(each => (
                        <CartProducts
                            each={each}
                            key={each.id}
                            increment={this.increment}
                            decrement={this.decrement}
                            deleteItem={this.deleteItem}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Cart;
