import React, { useReducer } from 'react';
import axios from 'axios'

import { calcTotalPrice } from '../helpers/CalcPrice';
import { calcSubPrice } from '../helpers/CalcPrice';
import { useHistory } from 'react-router-dom';
export const productContext = React.createContext();

const INIT_STATE = {
    products: [],
    productToEdit: null,
    productToDetails: null,
    pageCount: 4,
    page: 1,
    productsCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).products.length : 0,
    totalCount: 0,
    productsCountInLiked: JSON.parse(localStorage.getItem('liked')) ? JSON.parse(localStorage.getItem('liked')).products.length : 0
}


const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "CET_CONTACTS_DATA":
            return { ...state, products: action.payload }
        case "EDIT_TODO":
            return { ...state, productToEdit: action.payload }
        case "DETAILS_TODO":
            return { ...state, productToDetails: action.payload }
        case "CONTACTS_SET_PAGE":
            return { ...state, page: action.page }
        case "ADD_AND_DELETE_PRODUCT_IN_CART":
            return { ...state, productsCountInCart: action.payload }
        case "GET_CART":
            return { ...state, cartData: action.payload }
        case "DELETE_ITEM":
            return { ...state, cartData: action.payload }
        case "SET_TOTAL_COUNT":
            return { ...state, totalCount: action.payload };
        case "ADD_AND_DELETE_PRODUCT_IN_LIKED":
            return { ...state, productsCountInLiked: action.payload }
        case "GET_LIKED":
            return { ...state, likeData: action.payload }
        default: return state
    }
}

const ProductContextProvider = ({ children }) => { //оборачивает в чилдрен
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
    const history = useHistory();


    const pageTask = async (page) => {
        const search = new URLSearchParams(window.location.search);
        search.set("_page", page);
        search.set("_limit", 3);
        history.replace(window.location.pathname + "?" + search.toString());
        getproductsData()
    }
    const pageAdmin = async (page) => {
        const search = new URLSearchParams(window.location.search);
        search.set("_page", page);
        search.set("_limit", 3);
        history.replace(window.location.pathname + "?" + search.toString());
        getproductsAdmin()
    }


    const getproductsData = async () => {
        let params = new URLSearchParams(window.location.search);
        if (!params.get("_page")) params.set("_page", 1);
        if (!params.get("_limit")) params.set("_limit", 3);
        history.push("/list?" + params);
        let { data, headers } = await axios(`http://localhost:8000/products?${params}`);
        dispatch({
            type: "SET_TOTAL_COUNT",
            payload: parseInt(headers["x-total-count"])
        })
        dispatch({
            type: "CET_CONTACTS_DATA",
            payload: data
        })
    }
    const getproductsAdmin = async () => {
        let params = new URLSearchParams(window.location.search);
        if (!params.get("_page")) params.set("_page", 1);
        if (!params.get("_limit")) params.set("_limit", 3);
        history.push("/admin?" + params);
        let { data, headers } = await axios(`http://localhost:8000/products?${params}`);
        dispatch({
            type: "SET_TOTAL_COUNT",
            payload: parseInt(headers["x-total-count"])
        })
        dispatch({
            type: "CET_CONTACTS_DATA",
            payload: data
        })
    }


    const addTask = async (newTask) => {
        await axios.post('http://localhost:8000/products', newTask)
        getproductsAdmin()
    }

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:8000/products/${id}`)
        getproductsAdmin()
    }

    const editTodo = async (id) => {
        let { data } = await axios(`http://localhost:8000/products/${id}`)
        dispatch({
            type: "EDIT_TODO",
            payload: data
        })
    }

    const detailsTodo = async (id) => {
        let { data } = await axios(`http://localhost:8000/products/${id}`)
        console.log(data);
        dispatch({
            type: "DETAILS_TODO",
            payload: data
        })
    }

    const saveTask = async (newTask, history) => {
        try {
            await axios.patch(`http://localhost:8000/products/${newTask.id}`, newTask)
            history.push('/admin')
        } catch (error) {
            history.push('/error')
        }
    }

    function addAndDeleteProductInCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            };
        }
        let newProduct = {
            product: product,
            count: 1,
            subPrice: 0
        }

        newProduct.subPrice = calcSubPrice(newProduct)
        let newCart = cart.products.filter(item => item.product.id === product.id)
        if (newCart.length > 0) {
            cart.products = cart.products.filter(item => item.product.id !== product.id)
        } else {
            cart.products.push(newProduct)
        }
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length
        })

    }

    function checkProductInCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(item => item.product.id === id)
        return newCart.length > 0 ? true : false
    }

    function getCart() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }
    function changeCountProducts(count, id) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.products = cart.products.map(item => {
            if (item.product.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        getCart()
    }

    function makeOrder() {
        let cart = JSON.parse(localStorage.getItem('cart'))
        console.log(cart)
    }

    async function ratingProduct(id, rating) {
        console.log(id,rating);
        await axios.patch(`http://localhost:8000/products/${id}`, {rating: rating})
        getproductsData()
    }

    function deleteItem(id) {
        console.log('ID', id);
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.filter(item => item.product.id !== id)
        localStorage.setItem("cart", JSON.stringify(cart))
        getCart()
    }

    function addAndDeleteProductInLiked(product) {
        let liked = JSON.parse(localStorage.getItem('liked'));
        if (!liked) {
            liked = {
                products: []
            };
        }
        let newProduct = {
            product: product
        }
        let newLiked = liked.products.filter(item => item.product.id === product.id)
        if (newLiked.length > 0) {
            liked.products = liked.products.filter(item => item.product.id !== product.id)
        } else {
            liked.products.push(newProduct)
        }
        liked.totalPrice = calcTotalPrice(liked.products)
        localStorage.setItem("liked", JSON.stringify(liked))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_LIKED",
            payload: liked.products.length
        })

    }

    function checkProductInLiked(id) {
        let liked = JSON.parse(localStorage.getItem('liked'));
        if (!liked) {
            liked = {
                products: [],
                totalPrice: 0
            }
        }
        let newLiked = liked.products.filter(item => item.product.id === id)
        return newLiked.length > 0 ? true : false

    }

    function getLiked() {
        let liked = JSON.parse(localStorage.getItem('liked'));
        dispatch({
            type: "GET_LIKED",
            payload: liked
        })
    }

    function deleteItemInLiked(id) {
        console.log('ID', id);
        let liked = JSON.parse(localStorage.getItem('liked'))
        liked.products = liked.products.filter(item => item.product.id !== id)
        localStorage.setItem("liked", JSON.stringify(liked))
        getLiked()
    }
    return (
        <productContext.Provider value={{
            products: state.products,
            productToEdit: state.productToEdit,
            productToDetails: state.productToDetails,
            page: state.page,
            productsCountInCart: state.productsCountInCart,
            productsCountInLiked: state.productsCountInLiked,
            cartData: state.cartData,
            totalCount: state.totalCount,
            likeData: state.likeData,
            deleteItemInLiked,
            getLiked,
            addAndDeleteProductInLiked,
            checkProductInLiked,
            addTask,
            getproductsData,
            getproductsAdmin,
            pageAdmin,
            addAndDeleteProductInCart,
            checkProductInCart,
            deleteTask,
            editTodo,
            detailsTodo,
            deleteItem,
            saveTask,
            pageTask,
            getCart,
            makeOrder,
            changeCountProducts,
            ratingProduct
        }}>
            {children}
        </productContext.Provider>
    )
}

export default ProductContextProvider;
