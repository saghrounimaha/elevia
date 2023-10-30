import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { cart_product } from '../../../redux/features/cart-slice';
import { add_force_page, add_item_offset, single_product } from '../../../redux/features/product-slice';
import { add_to_wishlist } from '../../../redux/features/wishlist-slice';
import Pagination from '../pagination';


function ProductList({ itemsPerPage, items,setShowing }) {
  const [productData, setProductData] = useState();
  const { forcePage, item_offset } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);


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

  return <>
    {items && items.map((product, index) => (
      <div key={index} className="product__wrapper mb-40">
        <div className="row">
          <div className="col-xl-4 col-lg-4">
            <div className="product__thumb list">
              <Link href={`/product-details/${product.id}`} className="w-img">

                <img src={product.image[0]} alt="product-img" />
                {product.image[0] && <img className="product__thumb-2" src={product.image[0]} alt="product-img" />}

              </Link>
              {product.product__sale && <div className="product__sale">
                {product.product__sale.map((item, index) => (
                  <span key={index} className={`${item === 'new' ? 'new' : 'percent'}`}>
                    {item}
                  </span>
                ))}
              </div>}
            </div>
          </div>
          <div className="col-xl-8 col-lg-8">
            <div className="product__content p-relative">
              <div className="product__content-inner list">
                <h4>
                  <Link href={`/product-details/${product.id}`}>
                    {product.title}
                  </Link>
                </h4>
                <div className="product__price-2 mb-10">
                  <span>${product.price}</span>
                  {product?.price&& <span className="old-price">${product.price}</span>}
                </div>
                <p>Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus.</p>
                <div className="product__list mb-30">
                  <ul>
                    <li><span>Light green crewneck sweatshirt.</span></li>
                    <li><span>Hand pockets.</span></li>
                    <li><span>Relaxed fit.</span></li>
                  </ul>
                </div>
              </div>
              <div className="add-cart-list d-sm-flex align-items-center">
                <button onClick={() => dispatch(cart_product(product))} href="#" className="add-cart-btn mr-10">
                  + Add to Cart</button>
                <div className="product__action-2 transition-3 mr-20">
                  <button onClick={() => dispatch(add_to_wishlist(product))}
                  data-bs-toggle="tooltip" data-placement="top" title="Add to Wishlist">
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
              </div>
              {/* <!-- shop modal start --> */}
            </div>
          </div>
        </div>
      </div>
    ))}

    <div className="row mt-35">
      <div className="col-xl-12">
        <div className="shop-pagination-wrapper d-md-flex justify-content-between align-items-center">
          <div className="basic-pagination">
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
          </div>
        </div>
      </div>
    </div>
  </>;
}


export default ProductList;