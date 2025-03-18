import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [selectedTotal, setSelectedTotal] = useState(0);

    // Fetch cart data
    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item],
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    // Toggle item selection and update total price
    const toggleItemSelection = (itemId, size, price, quantity) => {
        setSelectedItems((prev) => {
            const updatedSelection = { ...prev };
            if (updatedSelection[itemId]?.[size]) {
                delete updatedSelection[itemId][size];
                if (Object.keys(updatedSelection[itemId]).length === 0) {
                    delete updatedSelection[itemId];
                }
            } else {
                if (!updatedSelection[itemId]) {
                    updatedSelection[itemId] = {};
                }
                updatedSelection[itemId][size] = { price, quantity };
            }
            return { ...updatedSelection };
        });
    };

    // Calculate total amount for selected items
    useEffect(() => {
        let total = 0;
        Object.keys(selectedItems).forEach((productId) => {
            Object.keys(selectedItems[productId]).forEach((size) => {
                const { price, quantity } = selectedItems[productId][size];
                total += price * quantity;
            });
        });
        setSelectedTotal(total);
    }, [selectedItems]);

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div>
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);

                    return (
                        <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[0.2fr_4fr_0.5fr_0.5fr] sm:grid-cols-[0.2fr_4fr_2fr_0.5fr] items-center gap-4'>
                            <input
                                type='checkbox'
                                checked={selectedItems[item._id]?.[item.size] || false}
                                onChange={() =>
                                    toggleItemSelection(item._id, item.size, productData.price, item.quantity)
                                }
                            />

                            <div className='flex items-start gap-6'>
                                <img className='w-16 sm:w-20' src={productData.image[0]} alt='' />
                                <div>
                                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                    <div className='flex items-center gap-5 mt-2'>
                                        <p>{currency}{productData.price}</p>
                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                                    </div>
                                </div>
                            </div>

                            <input
                                onChange={(e) =>
                                    e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))
                                }
                                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                                type='number'
                                min={1}
                                defaultValue={item.quantity}
                            />

                            <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt='' />
                        </div>
                    );
                })}
            </div>

            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal selectedTotal={selectedTotal} />
                    <div className='w-full text-end'>
                        <button
                            onClick={() => {
                                if (Object.keys(selectedItems).length === 0) {
                                    alert('Please select items to proceed.');
                                    return;
                                }
                                navigate('/place-order', { state: { selectedItems, total: selectedTotal } });
                            }}
                            className='bg-black text-white text-sm my-8 px-8 py-3'
                        >
                            PROCEED TO CHECKOUT ({currency}{selectedTotal.toFixed(2)})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
