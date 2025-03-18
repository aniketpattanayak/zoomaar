import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = ({ selectedTotal = 0 }) => {
    const { currency, delivery_fee } = useContext(ShopContext);

    const subtotal = Number(selectedTotal) || 0;
    const finalTotal = subtotal === 0 ? 0 : subtotal + Number(delivery_fee || 0);

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {subtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {subtotal === 0 ? "0.00" : Number(delivery_fee || 0).toFixed(2)}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {finalTotal.toFixed(2)}</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
