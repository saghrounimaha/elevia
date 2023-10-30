import { useEffect, useState,useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { add_force_page, add_item_offset, single_product,addCategory } from '../../../redux/features/product-slice';
import { add_to_wishlist } from '../../../redux/features/wishlist-slice';
import { cart_product } from '../../../redux/features/cart-slice';
import Pagination from '../pagination';
import { UserContext } from '@/src/contexts/UserContext';
import { AppContext } from '@/context/AppContext';
import { API,graphqlOperation,Storage  } from 'aws-amplify'
import { createFavorite } from '@/src/graphql/mutations';
import { toast } from 'react-toastify';
import { listFavorites } from '@/src/graphql/queries';
function ProductGrid({ itemsPerPage,col = "col-xl-4 col-lg-4 col-md-6 col-sm-6 custom-col-10",items,setShowing}){
  const { forcePage, item_offset } = useSelector(state => state.products);
  const myAppContext= useContext(AppContext);
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [productData, setProductData] = useState(null);
  const [myPath, setMyPath]= useState('');
  const [productlist, setProductlist] =useState([]);
  const { user } = useContext(UserContext);
  
  
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setProductData(items?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items?.length / itemsPerPage) )  ;
  }, [itemOffset, itemsPerPage, items]);

  useEffect(() => {
    if (productData && setShowing) {
      setShowing(productData.length)
    }
  }, [productData, setShowing])

  useEffect(() => {
    dispatch(add_item_offset(itemOffset));
  }, [dispatch, itemOffset]);

  useEffect(() => {
    setItemOffset(item_offset);
  }, [item_offset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    dispatch(add_force_page(event.selected));
  };
  
  useEffect(()=>{
     const paths=asPath.replace('/', '');
     setMyPath(paths);
   }, [asPath]);


   useEffect(() => {
     const fetchFavorites = async () => {
       try {
         const response = await API.graphql(graphqlOperation(listFavorites));
         const favorites = response.data.listFavorites.items;
         setProductlist(favorites);
       } catch (error) {
         console.error('Error fetching favorites:', error);
       }
     };
   
     fetchFavorites();
   }, []);

  const handleClick = async (product) => {
    const productId = product.id;
    const existingProduct = productlist.find((item) => item.idproduct === productId);
    if (existingProduct) {
      toast.error(`${product.name} already added to wishlist`, {
        position: 'top-left'
      });
    } else {
      if (user) {
        try {
          const result = await API.graphql(graphqlOperation(createFavorite, {
            input: {
              idproduct: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            }
          }));
          console.log(result);
          const response = await API.graphql(graphqlOperation(listFavorites));
          const favorites = response.data.listFavorites.items;
          setProductlist(favorites);
          toast.success(`${product.name}  added to wishlist`, {
            position: 'top-left'
          });
                } catch (err) {
          console.log('Error creating favorite:', err);
        }
      } else {
        dispatch(add_to_wishlist(product));
      }
    }
  };


        if (myPath=="shop"){
          return  <> 

          {productData && productData
        
            .filter(product => product.price < myAppContext.price)
            .map((product,index) => (
      
            <div  className={col} key={index}>
              <div className="product__wrapper mb-60">
                <div className="product__thumb">
                  <Link href={`/product-details/${product.id}`} className="w-img">
      
                    <img src={product.image[0]} alt="product-img" />
                    {product&&
                      <img className="product__thumb-2" src={product.image[1]} alt="product-img" />
                    }
      
                  </Link>
                  <div className="product__action transition-3">
                    <button onClick={() => handleClick(product)} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
                      <i className="fal fa-heart"></i>
                    </button>
                    <Link
                      href={`/product-details/${product.id}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Details">
      
                      <i className="fal fa-link"></i>
      
                    </Link>
                    {/* <!-- Button trigger modal --> */}
                    <a onClick={() => dispatch(single_product(product.id))} href="#" data-bs-toggle="modal" 
                    data-bs-target="#productModalId">
                      <i className="fal fa-search"></i>
                    </a>
                  </div>
                   <div className="product__sale">
                    {product.new && (
                     <span className='new'>
                     New
                     </span>
                        ) }
            
                     {product.onpromo && (
                     <span className='percent'>
                      {product.promo}
                    </span>
                       )   }
                    </div>
      
                </div>
                <div className="product__content p-relative">
                  <div className="product__content-inner">
                    <h4>
                      <Link href={`/product-details/${product.id}`}>
                        {product.name}
                      </Link>
                    </h4>
                    <div className="product__price transition-3">
                      <span>${product.price}</span>
                    </div>
                  </div>
                  <div className="add-cart p-absolute transition-3">
                    <button onClick={() => dispatch(cart_product(product))}>+ Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      
          <div className="row mt-35">
            <div className="col-xl-12">
              <div className="shop-pagination-wrapper d-md-flex justify-content-between align-items-center">
                <div className="basic-pagination">
                   <Pagination handlePageClick={handlePageClick} pageCount={pageCount} focusPage={forcePage} />
                </div>
              </div>
            </div>
          </div>
      
        </>;
        }else{
          return <> 
          {productData && productData
            .filter(product => product.category== myPath)
             .filter(product => product.price < myAppContext.price)
            .map((product) => (
      
            <div  className={col}>
              <div className="product__wrapper mb-60">
                <div className="product__thumb">
                  <Link href={`/product-details/${product.id}`} className="w-img">
      
                    <img src={product.image[0]} alt="product-img" />
                    {product&&
                      <img className="product__thumb-2" src={product.image[1]} alt="product-img" />
                    }
      
                  </Link>
                  <div className="product__action transition-3">
                    <button onClick={() => dispatch(add_to_wishlist(product))} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
                      <i className="fal fa-heart"></i>
                    </button>
                    <Link
                      href={`/product-details/${product.id}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Details">
      
                      <i className="fal fa-link"></i>
      
                    </Link>
                    {/* <!-- Button trigger modal --> */}
                    <a onClick={() => dispatch(single_product(product.id))} href="#" data-bs-toggle="modal" 
                    data-bs-target="#productModalId">
                      <i className="fal fa-search"></i>
                    </a>
                  </div>
                   <div className="product__sale">
                    {product.new && (
                     <span className='new'>
                     New
                     </span>
                        ) }
            
                     {product.onpromo && (
                     <span className='percent'>
                      {product.promo}
                    </span>
                       )   }
                    </div>
      
                </div>
                <div className="product__content p-relative">
                  <div className="product__content-inner">
                    <h4>
                      <Link href={`/product-details/${product.id}`}>
                        {product.name}
                      </Link>
                    </h4>
                    <div className="product__price transition-3">
                      <span>${product.price}</span>
      *              </div>
                  </div>
                  <div className="add-cart p-absolute transition-3">
                    <button onClick={() => dispatch(cart_product(product))}>+ Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      
          <div className="row mt-35">
            <div className="col-xl-12">
              <div className="shop-pagination-wrapper d-md-flex justify-content-between align-items-center">
                <div className="basic-pagination">
                   <Pagination handlePageClick={handlePageClick} pageCount={pageCount} focusPage={forcePage} />
                </div>
              </div>
            </div>
          </div>
      
        </>;        }
    

}


export default ProductGrid;