import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    // const currency = '$';
    const currency='₹';
    const delivery_fee = 10;
    const backendUrl="https://zoomaar.onrender.com";
    const [token,setToken]=useState('');

    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products,setProducts]=useState([]);
    const [categories, setCategories] = useState([]);
    const addToCart = async (itemId, size) => {
        // if (!size) {
        //     toast.error("Select product size");
        //     console.log("Size not selected!");
        //     return;
        // }
    
        const userId = localStorage.getItem("userId");  // ✅ Retrieve userId
        if (!userId) {
            toast.error("User not logged in!");
            console.error("❌ User ID is missing from localStorage!");
            return;
        }
    
        console.log("Adding to cart:", itemId, size, "User ID:", userId);  // Debugging
    
        let cartData = structuredClone(cartItems);
    
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
    
        setCartItems(cartData);
        console.log("Cart Updated:", cartData);
    
        if (token) {
            try {
                const response = await axios.post(
                    backendUrl + "/api/cart/add",
                    { userId, itemId, size },  // ✅ Send userId in API request
                    { headers: { token } }
                );
                console.log("Backend response:", response.data);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };
    

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if(token){
            try{

                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})

            }catch(error){
                console.log(error)
                toast.error(error.message)

            }
        }

    }


    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
    
            if (response.data.success) {
                setCartItems(response.data.cart || {});  // Ensure default object
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {  //product
            for (const item in cartItems[items]) {   //size 
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                }
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                }
            }
        }
        return totalAmount;
    }

    const getProductsData=async()=>{
        try{

            const response=await axios.get(backendUrl+'/api/product/list');
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }


        }catch(error){
            console.log(error);
            toast.error(error.message)

        }
    }

    useEffect(()=>{
        getProductsData();
    },[]);


    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])


    const getCategories = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/categories`);
            if (response.data.success) {
                setCategories(response.data.categories);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    
    useEffect(() => {
        getCategories();
    }, []);

    const value = {
        currency, delivery_fee,
        products,
        navigate,
        search, setSearch,
        showSearch, setShowSearch,
        addToCart, updateQuantity,
        cartItems,
        getCartCount, getCartAmount,backendUrl,
        setToken,token,getCategories,categories,setCartItems

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )


}

export default ShopContextProvider;





