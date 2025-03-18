import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";

const Collection = () => {
    const context = useContext(ShopContext);

    if (!context) {
        console.error("ShopContext is undefined. Ensure ShopContextProvider is wrapped correctly.");
        return <div>Loading...</div>;
    }

    const { products } = context;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchParams] = useSearchParams();
    
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");

    useEffect(() => {
        if (products.length > 0) {
            if (category && subCategory) {
                const filtered = products.filter((product) => 
                    product.category?.toLowerCase() === category.toLowerCase() &&
                    product.subCategory?.toLowerCase() === subCategory.toLowerCase()
                );
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts(products); // Show all products if no filters
            }
        }
    }, [category, subCategory, products]);

    return (
        <div className="p-2 sm:p-3">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
                {category && subCategory 
                    ? `Products in ${category} - ${subCategory}`
                    : "All Products"}
            </h2>
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                    {filteredProducts.map((product) => (
                        <ProductItem 
                            key={product._id} 
                            id={product._id} 
                            image={product.image} 
                            name={product.name} 
                            price={product.price} 
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">No products found.</p>
            )}
        </div>
    );
};

export default Collection;
