import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Categories = () => {
  const { categories } = useContext(ShopContext);
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="relative w-full">
      <div className="flex justify-center gap-6 py-3 bg-white shadow-md">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Main Category */}
            <button
              className="text-gray-800 font-medium hover:text-purple-600 transition"
              onClick={() => navigate(`/collection?category=${category.name}`)}
            >
              {category.name}
            </button>

            {/* Subcategory Dropdown - Responsive for all screen sizes */}
            {hoveredCategory === index && category.subcategories.length > 0 && (
              <div
                className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg p-4 z-50 transition-opacity duration-300 ease-in-out md:block"
              >
                {category.subcategories.map((subCategory, subIndex) => (
                  <button
                    key={subIndex}
                    className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                    onClick={() =>
                      navigate(
                        `/collection?category=${category.name}&subCategory=${subCategory}`
                      )
                    }
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
