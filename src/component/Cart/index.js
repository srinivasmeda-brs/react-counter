import { Component } from "react";
import CartProducts from "../CartProducts";
import './index.css';  // Import the CSS file for styling

const initialData = [
    { id: 1, count: 0, product: true },
    { id: 2, count: 0, product: true },
    { id: 3, count: 0, product: true },
    { id: 4, count: 0, product: true }
];

class Cart extends Component {
    state = { data: initialData, productCount: 4 };  // Initially 4 items are eligible

    componentDidMount() {
        this.getData();
    }

    increment = (id) => {
        this.setState(prevState => ({
            data: prevState.data.map(item =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            )
        }));
    };

    decrement = (id) => {
        this.setState(prevState => ({
            data: prevState.data.map(item =>
                item.id === id && item.count > 0 ? { ...item, count: item.count - 1 } : item
            )
        }));
    };

    deleteItem = (id) => {
        this.setState(prevState => {
            // Delete the item
            const updatedData = prevState.data.filter(each => each.id !== id);

            // Recalculate the productCount based on remaining items with product: true
            const productCount = updatedData.filter(item => item.product).length;

            return {
                data: updatedData,
                productCount: productCount  // Update productCount
            };
        });
    };

    getData = () => {
        // Calculate productCount based on product:true in the data
        const productCount = this.state.data.filter(item => item.product).length;
        this.setState({ productCount });
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
