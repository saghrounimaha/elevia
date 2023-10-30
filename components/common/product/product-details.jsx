import { useDispatch, useSelector } from 'react-redux';
import { useState ,useEffect} from 'react';
import Link from 'next/link';
import { cartProducts, cart_product, decrease_quantity } from '../../../redux/features/cart-slice';
import { selectProducts, single_product } from '../../../redux/features/product-slice';
import ProductModal from '../modal/product-modal';
import { add_to_wishlist } from '../../../redux/features/wishlist-slice';
import { useListTrendingQuery } from '../../../redux/features/propertiesApi';

const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartProducts)
  const selectedItem = cartItems.find(item => Number(item.id) === Number(item.id));
  return <>
    <section className="shop__area pb-65">
      <div className="shop__top grey-bg-6 pt-100 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="product__modal-box d-flex">
                <div className="product__modal-nav mr-20">
                  <nav>
                    <div className="nav nav-tabs" id="product-details" role="tablist">
                      {product?.image?.map((img, index) => (
                        <a key={index} className={`nav-item nav-link mb-20 ${index === 0 ? 'active' : ''}`}
                          id={`nav-${index}-tab`} data-bs-toggle="tab" href={`#nav-${index}`}
                          role="tab" aria-controls={`nav-${index}`}
                          aria-selected={index === 0 ? 'true' : 'false'}>
                          <div className="product__nav-img w-img">
                            <img src={img} alt="" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>

                <div className="tab-content mb-20" id="product-detailsContent">

                  {product?.image?.map((img, index) => (
                    <div key={index} className={`tab-pane fade ${index === 0 ? 'show active' : ''} `}
                      id={`nav-${index}`} role="tabpanel" aria-labelledby={`nav-${index}-tab`}>
                      <div className="product__modal-img w-img">
                        <img src={img} alt="" />
                        {product.product_sale && <div className="product__sale ">
                          <span className="new">new</span>
                          <span className="percent">-16%</span>
                        </div>}
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="product__modal-content product__modal-content-2">
                <h4>
                  <Link href={`/product-details/${product?.id}`}>
                    {product?.name}
                  </Link>
                </h4>
                <div className="rating rating-shop mb-15">
                  <ul>
                    <li><span><i className="fas fa-star"></i></span></li>
                    <li><span><i className="fas fa-star"></i></span></li>
                    <li><span><i className="fas fa-star"></i></span></li>
                    <li><span><i className="fas fa-star"></i></span></li>
                    <li><span><i className="fal fa-star"></i></span></li>
                  </ul>
                  <span className="rating-no ml-10 rating-left">
                    {product?.rating} rating(s)
                  </span>
                  <span className="review rating-left"><a href="#">Add your Review</a></span>
                </div>
                <div className="product__price-2 mb-25">
                  <span>${product?.price}</span>
                  {product?.old_price && <span className="old-price">${product?.old_price}</span>}
                </div>
                <div className="product__modal-des mb-30">
                  <p>{product?.desc}</p>
                </div>
                <div className="product__modal-form mb-30">
                  <form action="#">
                    <div className="product__modal-input size mb-20">
                      <label>Size <i className="fas fa-star-of-life"></i></label>
                      <select>
                        <option>- Please select -</option>
                        {product?.sizes?.map((size, index) => (
                          <option key={index}>{size}</option>
                        ))}
                      </select>
                    </div>
                  
                    <div className="product__modal-required mb-5">
                      <span >Repuired Fiields *</span>
                    </div>
                    <div className="pro-quan-area d-sm-flex align-items-center">
                      <div className="product-quantity-title">
                        <label>Quantity</label>
                      </div>
                      <div className="product-quantity mr-20 mb-20">
                        <div className="cart-plus-minus">
                          <input type="text" value={selectedItem?.quantity ? selectedItem?.quantity : 0} />
                          <div onClick={() => dispatch(decrease_quantity(product))} className="dec qtybutton">-</div>
                          <div onClick={() => dispatch(cart_product(product))} className="inc qtybutton">+</div>
                        </div>
                      </div>
                      <div className="pro-cart-btn">
                        <a href="#" onClick={() => dispatch(cart_product(product))}
                          className="add-cart-btn mb-20">+ Add to Cart</a>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="product__tag mb-25">
                  <span>Category:</span>
                  <span><a href="#">{product.category}</a></span>
                
                </div>
                <div className="product__share">
                  <span>Share :</span>
                  <ul>
                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fab fa-behance"></i></a></li>
                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                    <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shop__bottom">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="product__details-tab">
                <div className="product__details-tab-nav text-center mb-45">
                  <nav>
                    <div className="nav nav-tabs justify-content-start justify-content-sm-center" id="pro-details" role="tablist">
                      <a className="nav-item nav-link active" id="des-tab" data-bs-toggle="tab" href="#des" role="tab" aria-controls="des" aria-selected="true">Description</a>
                      <a className="nav-item nav-link" id="add-tab" data-bs-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="false">Additional Information</a>
                      <a className="nav-item nav-link" id="review-tab" data-bs-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">Reviews (4)</a>
                    </div>
                  </nav>
                </div>
                <div className="tab-content" id="pro-detailsContent">
                  <div className="tab-pane fade show active" id="des" role="tabpanel">
                    <div className="product__details-des">
                      <p> {product.description}</p>

                    
                    </div>
                  </div>
                  <div className="tab-pane fade" id="add" role="tabpanel">
                    <div className="product__details-add">
                      <ul>
                        <li><span>Quantity</span></li>
                        <li><span>{product?.quantity}</span></li>
                        <li><span>Weight</span></li>
                        <li><span>{product?.weight} KG</span></li>
                        <li><span>Dimention</span></li>
                        <li><span>{product?.dimension}</span></li>
                       
                      </ul>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="review" role="tabpanel">
                    <div className="product__details-review">
                      <div className="postbox__comments">
                        <div className="postbox__comment-title mb-30">
                          <h3>Reviews (32)</h3>
                        </div>
                        <div className="latest-comments mb-30">
                          <ul>
                            {product?.reviews?.map((review, index) => (
                              <li key={index} className={review.children ? 'children' : ''}>
                                <div className="comments-box">
                                  <div className="comments-avatar">
                                    <img src={review.img} alt="" />
                                  </div>
                                  <div className="comments-text">
                                    <div className="avatar-name">
                                      <h5>{review.name}</h5>
                                      <span> - {review.time} </span>
                                      <a className="reply" href="#">Leave Reply</a>
                                    </div>
                                    <div className="user-rating">
                                      <ul>
                                        <li><a href="#"><i className="fas fa-star"></i></a></li>
                                        <li><a href="#"><i className="fas fa-star"></i></a></li>
                                        <li><a href="#"><i className="fas fa-star"></i></a></li>
                                        <li><a href="#"><i className="fas fa-star"></i></a></li>
                                        <li><a href="#"><i className="fal fa-star"></i></a></li>
                                      </ul>
                                    </div>
                                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for <span>“lorem ipsum”</span> will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</p>
                                  </div>
                                </div>
                              </li>
                            ))}

                          </ul>
                        </div>
                      </div>
                      <div className="post-comments-form mb-100">
                        <div className="post-comments-title mb-30">
                          <h3>Your Review</h3>
                          <div className="post-rating">
                            <span>Your Rating :</span>
                            <ul>
                              <li>
                                <a href="#">
                                  <i className="fal fa-star"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fal fa-star"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fal fa-star"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fal fa-star"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fal fa-star"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <form id="contacts-form" className="conatct-post-form" action="#">
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                              <div className="contact-icon p-relative contacts-name">
                                <input type="text" placeholder="Name" />
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                              <div className="contact-icon p-relative contacts-name">
                                <input type="email" placeholder="Email" />
                              </div>
                            </div>
                            <div className="col-xl-12">
                              <div className="contact-icon p-relative contacts-email">
                                <input type="text" placeholder="Subject" />
                              </div>
                            </div>
                            <div className="col-xl-12">
                              <div className="contact-icon p-relative contacts-message">
                                <textarea name="comments" id="comments" cols="30" rows="10"
                                  placeholder="Comments"></textarea>
                              </div>
                            </div>
                            <div className="col-xl-12">
                              <button className="os-btn os-btn-black" type="submit">Post comment</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* RelatedProducts start */}
    <RelatedProducts />
    {/* RelatedProducts end */}

    {/* product modal start */}
    <ProductModal />
    {/* product modal end */}
  </>;
};

export default ProductDetails;



const RelatedProducts = () => {

  const [productData, setProductData] = useState();
  const { data, isLoading, isFetching } = useListTrendingQuery();
  useEffect(() => {
     if (!isLoading && !isFetching && data){
      setProductData(data.data.listProducts.items);
      }
    }, [data]);
    console.log(data)

  const trendingProducts = useSelector(selectProducts)
    .filter(item => item.trending)
    .map(productData => productData.productData)
    .flat()
    .slice(0, 4);
  const dispatch = useDispatch();
  return <>
    <section className="related__product pb-60">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="section__title-wrapper text-center mb-55">
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
          {productData && productData.slice(0, 4).map((product, index) => (
            <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="product__wrapper mb-60">
                <div className="product__thumb">
                  <Link href={`/product-details/${product.id}`} className="w-img">

                    <img src={product.image[0]} alt="product-img" />
                   

                  </Link>
                  <div className="product__action transition-3">
                    <button onClick={() => dispatch(add_to_wishlist(product))} href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
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
                     {!product.new&&(
                     <span className='new'>
                        New
                      </span>
                      ) }
                      
                      {!product.onpromo&&(
                        <span className='percent'>
                        {product.promo}
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
                      {product.old_price && <span className="old-price">${product.old_price}</span>}
                    </div>
                  </div>
                  <div className="add-cart p-absolute transition-3">
                    <button onClick={() => dispatch(cart_product(product))}>+ Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>


  </>;
}