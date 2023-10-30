import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import { useState ,useEffect} from 'react';
import { cart_product } from '../../../redux/features/cart-slice';
import { selectProducts, single_product } from '../../../redux/features/product-slice';
import { add_to_wishlist } from '../../../redux/features/wishlist-slice';
import ProductModal from '../modal/product-modal';
import { useListSaleQuery } from '@/redux/features/propertiesApi';
import { createFavorite } from "@/src/graphql/mutations";

import { useContext } from "react";

import { UserContext } from "@/src/contexts/UserContext";

import { API,graphqlOperation,Storage  } from 'aws-amplify'

import { listFavorites } from "@/src/graphql/queries";

import { toast } from 'react-toastify';

// slider setting
const settings = {
  autoplay: true,
  autoplaySpeed: 10000,
  arrows: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      }
    },
  ]
};

const SaleOff = () => {
  const [productlist, setProductlist] =useState([]);
  const { user } = useContext(UserContext);

  const [productData, setProductData] = useState([]);
  const { data, isLoading, isFetching } = useListSaleQuery();
  useEffect(() => {
     if (!isLoading && !isFetching && data){
      setProductData(data.data.listProducts.items);
      }
    }, [data]);
    console.log(data)
  //const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  // const saleOffProduct = productData.map(item => item.product)

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

  return <>
    <section className="sale__area pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="section__title-wrapper text-center mb-55">
              <div className="section__title mb-10">
                <h2>Sale Off</h2>
              </div>
              <div className="section__sub-title">
                <p>Mirum est notare quam littera gothica quam nunc putamus parum claram!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="sale__area-slider">
              <Slider {...settings}>
                {productData && productData.slice(0, 6).map((item, index) => {
                    return (
                      <div key={index} className="sale__item">
                        <div className="product__wrapper mb-60">
                          <div className="product__thumb">
                            <Link href={`/product-details/${item.id}`} className="w-img">

                              <img src={item.image[0]}alt="product-img" />
                              <img className="product__thumb-2" src={item.thumb_img} alt="product-img" />

                            </Link>
                            <div className="product__action transition-3">
                              <button onClick={() => handleClick(item)} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
                                <i className="fal fa-heart"></i>
                              </button>
                              <Link
                                href={`/product-details/${item.id}`}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Details">

                                <i className="fal fa-link"></i>

                              </Link>
                              {/* <!-- Button trigger modal --> */}
                              <a onClick={() => dispatch(single_product(item.id))} href="#"
                                data-bs-toggle="modal" data-bs-target="#productModalId">
                                <i className="fal fa-search"></i>
                              </a>

                            </div>
                            <div className="product__sale">
                            {item.new && (
                            <span className='new'>
                               New
                               </span>
                                  ) }
                      
                            {item.onpromo && (
                             <span className='percent'>
                             {item.promo}
                           </span>
                            ) }
                           </div>
                          </div>
                          <div className="product__content p-relative">
                            <div className="product__content-inner">
                              <h4>
                                <Link href={`/product-details/${item.id}`}>
                                  {item.name}
                                </Link>
                              </h4>
                              <div className="product__price transition-3">
                                <span>{item.price}TND</span>
                                <span className="old-price">${item.old_price}.00</span>
                              </div>
                            </div>
                            <div className="add-cart p-absolute transition-3">
                              <button onClick={() => dispatch(cart_product(item))}>+ Add to Cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }

              </Slider>

            </div>
          </div>
        </div>
      </div>
    </section>

    {/* product modal start */}
    <ProductModal />
    {/* product modal end */}

  </>;
};

export default SaleOff;