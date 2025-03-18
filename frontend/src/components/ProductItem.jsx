import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link 
      onClick={() => scrollTo(0, 0)} 
      className="text-gray-700 cursor-pointer w-full sm:w-[200px] md:w-[250px] lg:w-[280px] p-4 sm:p-5 md:p-6"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden rounded-xl shadow-md border border-gray-200">
        <img 
          className="w-full h-48 object-cover rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out"
          src={image[0]} 
          alt={name} 
        />
      </div>
      <p className="pt-4 pb-2 text-sm text-center">{name}</p>
      <p className="text-sm font-medium text-center">{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
