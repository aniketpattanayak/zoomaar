import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const categoryData = {
  Men: [
    "Topwear",
    "Bottomwear",
    "Winterwear",
    "Footwear",
    "Accessories",
    "Sportswear",
    "Innerwear",
    "Ethnic Wear",
    "Casual Wear",
    "Formal Wear",
    "Party Wear",
    "Sunglasses",
    "Watches",
    "Belts & Wallets"
  ],
  Women: [
    "Ethnic Wear",
    "Western Wear",
    "Winterwear",
    "Footwear",
    "Jewelry",
    "Handbags",
    "Lingerie",
    "Maternity Wear",
    "Dresses & Gowns",
    "Sarees",
    "Kurtis & Kurtas",
    "Tops & Tees",
    "Makeup & Beauty",
    "Hair Accessories",
    "Sunglasses",
    "Watches",
    "Perfumes & Fragrances"
  ],
  Kids: [
    "Infants",
    "Boys Clothing",
    "Girls Clothing",
    "Toys & Games",
    "School Supplies",
    "Baby Essentials",
    "Kids Footwear",
    "Backpacks",
    "Stationery",
    "Party Supplies",
    "Diapers & Wipes"
  ],
  Electronics: [
    "Mobile Phones",
    "Laptops",
    "Cameras",
    "Accessories",
    "Gaming Consoles",
    "Tablets",
    "Smartwatches",
    "Headphones & Earphones",
    "Power Banks",
    "Speakers",
    "Home Theaters",
    "Smart Home Devices",
    "Computer Accessories",
    "Wearable Gadgets"
  ],
  Home: [
    "Furniture",
    "Home Decor",
    "Kitchenware",
    "Bedding",
    "Lighting",
    "Storage & Organization",
    "Cleaning Supplies",
    "Curtains & Blinds",
    "Wall Art & Stickers",
    "Bathroom Accessories",
    "Clocks & Wall Hangings",
    "Flower Vases & Pots"
  ],
  Beauty: [
    "Makeup",
    "Skincare",
    "Haircare",
    "Fragrances",
    "Personal Care",
    "Nail Care",
    "Men's Grooming",
    "Bath & Body",
    "Beauty Tools",
    "Hair Accessories",
    "Sunscreen & Moisturizers",
    "Lipsticks & Lip Care"
  ],
  Sports: [
    "Cricket",
    "Football",
    "Badminton",
    "Cycling",
    "Gym Equipment",
    "Sportswear",
    "Camping & Hiking",
    "Swimming Gear",
    "Running Shoes",
    "Yoga & Fitness",
    "Tennis & Table Tennis"
  ],
  Automotive: [
    "Car Accessories",
    "Bike Accessories",
    "Car Electronics",
    "Lubricants",
    "Helmets & Safety Gear",
    "Tyres & Wheels",
    "Car Covers",
    "Bike Covers",
    "Car & Bike Cleaning Supplies"
  ],
  Books: [
    "Fiction",
    "Non-fiction",
    "Academic",
    "Comics",
    "Self-Help",
    "Children's Books",
    "Magazines",
    "Novels",
    "Exam Preparation",
    "Religious & Spiritual",
    "Biographies",
    "Cookbooks"
  ],
  Grocery: [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Beverages",
    "Snacks & Chips",
    "Staples & Grains",
    "Cooking Essentials",
    "Spices & Masalas",
    "Instant Foods",
    "Bakery Items",
    "Chocolates & Sweets"
  ],
  Furniture: [
    "Beds & Mattresses",
    "Sofas & Seating",
    "Tables & Desks",
    "Chairs & Stools",
    "Storage & Cabinets",
    "Office Furniture",
    "Outdoor Furniture",
    "Home Office Setup"
  ],
  HomeAppliances: [
    "Refrigerators",
    "Washing Machines",
    "Air Conditioners",
    "Microwave Ovens",
    "Vacuum Cleaners",
    "Water Purifiers",
    "Fans & Coolers",
    "Room Heaters",
    "Iron & Steamers"
  ],
  PetSupplies: [
    "Dog Food",
    "Cat Food",
    "Pet Toys",
    "Pet Grooming",
    "Aquarium & Fish Care",
    "Pet Beds & Accessories",
    "Leashes & Collars"
  ],
  Stationery: [
    "Pens & Writing Tools",
    "Notebooks & Diaries",
    "Art & Craft Supplies",
    "Office Supplies",
    "Calculators",
    "Folders & Files",
    "Paper Products",
    "Drawing & Coloring"
  ],
  Health: [
    "Nutrition & Supplements",
    "Ayurveda & Herbal",
    "Health Care Devices",
    "Sexual Wellness",
    "Personal Hygiene",
    "First Aid & Medicines",
    "Weight Management"
  ],
  Travel: [
    "Luggage & Suitcases",
    "Backpacks & Rucksacks",
    "Travel Accessories",
    "Duffel Bags",
    "Travel Organizers",
    "Sleeping Bags & Tents"
  ],
  Industrial: [
    "Tools & Equipment",
    "Safety & Security",
    "Electricals & Wiring",
    "Hardware & Fittings",
    "Office & Business Supplies"
  ]
};




const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState(categoryData["Men"][0]);
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubCategory(categoryData[selectedCategory][0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers:{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }, });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[setImage1, setImage2, setImage3, setImage4].map((setImage, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img className='w-20' src={!eval(`image${index + 1}`) ? assets.upload_area : URL.createObjectURL(eval(`image${index + 1}`))} alt='' />
              <input onChange={(e) => setImage(e.target.files[0])} type='file' id={`image${index + 1}`} hidden />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={onCategoryChange} className='w-full px-3 py-2' value={category}>
            {Object.keys(categoryData).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2' value={subCategory}>
            {categoryData[category].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type='Number' placeholder='25' />
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type='checkbox' id='bestseller' />
        <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  );
};

export default Add;