import './App.css'
import Navi from "./Navi.jsx";
import CategoryList from "./CategoryList.jsx";
import ProductList from "./ProductList.jsx";
import {Col, Container, Row} from "reactstrap";
import {Component} from "react";
import alertify from "alertifyjs";
import {Route, Routes} from "react-router-dom";
import NotFound from "./NotFound.jsx";
import CartList from "./CartList.jsx";

class App extends Component {

    state = {
        currentCategory: "",
        products: [],
        cart: []
    }

    componentDidMount() {
        this.getProducts();
    }

    changeCategory = category => {
        this.setState({currentCategory: category.categoryName});
        this.getProducts(category.id);
    }

    getProducts  = (categoryId) => {
        let url = "http://localhost:3000/products";
        if (categoryId) {
            url += "?categoryId=" + categoryId;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({products: data}));
    }

    addProductToCart = (product) => {

        let newCart = this.state.cart;
        let addedItem = newCart.find(c => c.product.id === product.id);
        if (addedItem) {
            addedItem.quantity += 1;
        } else {
            newCart.push({product:product, quantity: 1});
        }

        this.setState({cart: newCart});
        alertify.success("Product Added Successfully");
    }

    removeProductFromCart = (id) => {
        let newCart = this.state.cart.filter(cartItem => cartItem.product.id !== id);
        this.setState({cart: newCart});
        alertify.error("Product Removed Successfully");
    }

    render() {

        let categoryInfo = {title: "Categories"}
        let productInfo = {title: "Products"}

        return (
            <div>
                <Container>
                    <Navi
                        cart={this.state.cart}
                        removeProductFromCart={this.removeProductFromCart}
                    />

                    <div style={{marginBottom: '20px'}}/>

                    <Row>
                        <Col xs={3}>
                            <CategoryList
                                currentCategory={this.state.currentCategory}
                                changeCategory={this.changeCategory}
                                info={categoryInfo}
                            />
                        </Col>

                        <Col xs={9}>
                            <Routes>
                                <Route path="/" element={
                                    <ProductList
                                        products={this.state.products}
                                        addProductToCart={this.addProductToCart}
                                        currentCategory={this.state.currentCategory}
                                        info={productInfo}
                                    />
                                } />
                                <Route path="/cart" element={
                                    <CartList 
                                        cart={this.state.cart}
                                        removeProductFromCart={this.removeProductFromCart}
                                    />
                                } />
                                <Route path="*" element={<NotFound/>} />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App
