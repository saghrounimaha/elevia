import React, { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { add_force_page, add_item_offset } from '../redux/features/product-slice';
import { useListPropertyQuery } from '@/redux/features/propertiesApi';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { data } = useListPropertyQuery();
  
    const productData=data?.data.listProducts.items;

    useEffect(() => {
      if (productData) {
        setItems(productData);
      }
    }, [productData]);
    
    const [items, setItems] = useState([]);
  

  const [categoryActive, setCategoryActive] = useState('');
  const [price, setPrice] = useState(500);
  const [sizeActive, setSizeActive] = useState('');
  const [color, setColor] = useState('');
  const [name, setName] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const router=useRouter()

 
  // handle Category Change
  const handleCategoryChange = (category) => {
    setCategoryActive(category);
   const newProducts = productData.filter(item => item.category === category);
    setItems(newProducts)
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  }




  // handle price change
  const handlePriceChange = (value) => {
    setPrice(value);
    const newProducts = productData.filter(item => item.price < value);
    setItems(newProducts)
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  }

  // const handleSearch = (name) => {
  //   setName(name);
  //   const newProducts = productData.filter(item =>item.name.toLowerCase() );
  //   setItems(newProducts);
  //   dispatch(add_item_offset(0));
  //   dispatch(add_force_page(0));
  // };


  

  const handleSearch = (query) => {
    // Perform the search logic based on the query
    const filteredResults = productData.filter(item => {
      // Implement your filtering logic here
      return item.name.toLowerCase().startsWith(query.toLowerCase());
    });

    setItems(filteredResults);
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  // // handle sizes
  // const handleProductSizes = (size) => {
  //   setSizeActive(size);
  //   const newProducts = products.filter(item => item.sizes.indexOf(size) > -1);
  //   setItems(newProducts)
  //   dispatch(add_item_offset(0));
  //   dispatch(add_force_page(0));
  // }

  // // handle sizes
  // const handleColors = (color) => {
  //   setColor(color);
  //   const newProducts = products.filter(item => item.colors.indexOf(color) > -1);
  //   setItems(newProducts)
  //   dispatch(add_item_offset(0));
  //   dispatch(add_force_page(0));
  // }

  //handle select change
  const handleSelectChange = e => {
    if (e.target.value === 'Default Sorting') {
      setItems(productData)
    }
    if (e.target.value === 'Short by new') {
      const newProducts = productData.filter(item => item.new);
      setItems(newProducts)
    }
    if (e.target.value === 'Short by featured') {
      const newProducts = productData.filter(item => item.feature);
      setItems(newProducts)
    }
    if (e.target.value === 'Short by price') {
      const newProducts = [...productData].sort((a, b) => a.price - b.price);
      setItems(newProducts)
    }
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  }






  // filtering brand 
  // const filteringBrands = (brand) => {
  //   const filtering_brands = products.filter(b => b.brand.toLowerCase() === brand.toLowerCase());
  //   setItems(filtering_brands)
  //   dispatch(add_item_offset(0));
  //   dispatch(add_force_page(0));
  // }


   // reset filtering
  const resetFiltering = () => {
    handleCategoryChange('')
    // filteringBrands('')
    // handleColors('')
    // handleProductSizes('')
    handlePriceChange(500)
    setItems(productData)
  }

  // all values
  const value = {
    items, setItems,
    price, setPrice,
    // query, setQuery,
    name,setName,
    handleCategoryChange,
    categoryActive,
    handlePriceChange, price,
    // handleProductSizes, sizeActive,
    // handleColors, color,
     handleSelectChange,
    showSidebar, 
    setShowSidebar,
     resetFiltering,
     handleSearch,
     //filteringBrands
  }
  return (
    <AppContext.Provider value={value} >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;