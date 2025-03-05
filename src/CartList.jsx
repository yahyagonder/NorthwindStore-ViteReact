import React, {Component} from 'react';
import {Table, Button} from "reactstrap";

class CartList extends Component {
    render() {
        return (
            <div>
                <h3>Your Cart</h3>
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.cart.map(cartItem => (
                        <tr key={cartItem.product.id}>
                            <td>{cartItem.product.id}</td>
                            <td>{cartItem.product.productName}</td>
                            <td>{cartItem.product.unitPrice}</td>
                            <td>{cartItem.quantity}</td>
                            <td>
                                <Button 
                                    color="danger" 
                                    onClick={() => this.props.removeProductFromCart(cartItem.product.id)}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default CartList;
