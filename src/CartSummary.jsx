import React, {Component} from 'react';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge,
    NavItem,
    NavLink,
} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class CartSummary extends Component {
    renderEmpty() {
        return (
            <NavItem>
                <NavLink>Empty Cart</NavLink>
            </NavItem>
        );
    }

    renderSummary() {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Your Cart({this.props.cart.length})
                </DropdownToggle>
                <DropdownMenu end>
                    {
                        this.props.cart.map(cartItem => (
                            <DropdownItem key={cartItem.product.id}>
                                <Badge 
                                    color="danger"
                                    onClick={() => this.props.removeProductFromCart(cartItem.product.id)}
                                >X</Badge>
                                {cartItem.product.productName}
                                <Badge color="success">{cartItem.quantity}</Badge>
                            </DropdownItem>
                        ))
                    }
                    <DropdownItem divider />
                    <DropdownItem>
                        <Link to="/cart">Go to cart</Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    render() {
        return (
            <div>
                {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
            </div>
        );
    }
}