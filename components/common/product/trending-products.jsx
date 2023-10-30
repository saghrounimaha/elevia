import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useState ,useEffect} from 'react';
import ProductModal from "../modal/product-modal";
import { selectProducts, single_product } from "../../../redux/features/product-slice";
import { cart_product } from "../../../redux/features/cart-slice";
import { add_to_wishlist } from "../../../redux/features/wishlist-slice";
import { useListTrendingQuery ,useGetFavoriteQuery} from "@/redux/features/propertiesApi";
import { createFavorite } from "@/src/graphql/mutations";
import { useContext } from "react";
import { UserContext } from "@/src/contexts/UserContext";
import { API,graphqlOperation,Storage  } from 'aws-amplify'
import { listFavorites } from "@/src/graphql/queries";
import { toast } from 'react-toastify';

const Products = ({ h4, h5 }) => {
  // slick setting
  const settings = {
    autoplay: true,
    autoplaySpeed: 10000,
    infinite: true,
    arrows: false,
    slidesToShow: h4 ? 5 : h5 ? 5 : 4,
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
  const [productlist, setProductlist] =useState([]);
  const { user } = useContext(UserContext);

  const [productData, setProductData] = useState();
  const { data, isLoading, isFetching } = useListTrendingQuery();
  useEffect(() => {
     if (!isLoading && !isFetching && data){
      setProductData(data.data.listProducts.items);
      }
    }, [data]);
    console.log(data)


  const dispatch = useDispatch();

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
    <section className="product__area pt-60 pb-100">
      <div className={`${!h5 && 'container'} ${h4 ? 'custom-container' : ''} ${h5 ? 'container-fluid' : ''}`}>
        <div className="row">
          <div className="col-xl-12">
            <div className={`section__title-wrapper text-center mb-55 ${h4 ? 'p-relative' : ''}`}>
              <div className="section__title mb-10">
                <h2>Trending Products</h2>
              </div>
              <div className="section__sub-title">
                <p>Mirum est notare quam littera gothica quam nunc putamus parum claram!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className={`product__slider ${h4 ? 'product__slider-4' : ''}`}>

                      <div >
                        <div className="product__item">
                        <Slider {...settings}>
                          {productData &&
                            productData.map((product, index) => (
                              <div key={index} className="product__wrapper mb-60">
                                <div className="product__thumb">
                                  <Link href={`/product-details/${product.id}`} className="w-img">

                                    <img src={product.image[0]} alt="product-img" />
                                    <img className="product__thumb-2" src={product.thumb_img} alt="product-img" />

                                  </Link>
                                  <div className="product__action transition-3">
                                    <button onClick={() => handleClick(product)}
                                      data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
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
                                    <a onClick={() => dispatch(single_product(product.id))} href="#" data-bs-toggle="modal" data-bs-target="#productModalId">
                                      <i className="fal fa-search"></i>
                                    </a>
                                  </div>
                                  <div className="product__sale">
                                  {product.new &&(
                                  
                                  <span className='new'>
                                        New
                                       </span>
                                       
                                        
                                  )}
                                  
                              {product.onpromo&&(
                             
                               
                                <span className='percent'>
                                 {product.promo}%
                                   </span>
                                
                                ) }
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
                                      <span>{product.price}TND</span>
                                      <span className="old-price">${product.old_price}.00</span>
                                    </div>
                                  </div>
                                  <div className="add-cart p-absolute transition-3">
                                    <button onClick={() => dispatch(cart_product(product))}>+ Add to Cart</button>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        
                        </Slider>
                        </div>
                      </div>
                  
          
               

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="product__load-btn text-center mt-25">
              <Link href="/shop" className="os-btn os-btn-3">
                See More
              </Link>
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

export default Products;