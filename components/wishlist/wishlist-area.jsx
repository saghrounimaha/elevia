import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cart_product } from '../../redux/features/cart-slice';
import { remove_wishlist_product, wishlistItems } from '../../redux/features/wishlist-slice';
import { listFavorites } from '@/src/graphql/queries';
import { API,graphqlOperation,Storage   } from 'aws-amplify'
import { useState,useEffect } from 'react';
import { deleteFavorite } from '@/src/graphql/mutations';
import { toast } from 'react-toastify';

const WishlistArea = () => {
  const [productlist, setProductlist] = useState();
  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      const productData=await API.graphql(graphqlOperation(listFavorites))

      setProductlist(productData.data.listFavorites.items);
    };
    // then call it here
    loadData();
  }, []);

  const wishlist = useSelector(wishlistItems);
  const dispatch = useDispatch();
  const handleSubmit = e => e.preventDefault();
  return <>
    <section className="cart-area pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {productlist && productlist.length === 0 &&
              <div className='text-center'>
                <h3>No wishlist product</h3>
              </div>
            }
            {productlist && productlist.length > 0 && <form onSubmit={handleSubmit}>
              <div className="table-content table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Images</th>
                      <th className="cart-product-name">Product</th>
                      <th className="product-price">Unit Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productlist.map((product, index) => (
                      <tr key={index}>
                        <td className="product-thumbnail">
                          <Link href={`/product-details/${product.id}`}>

                            <img src={product.image[0]} alt="" />

                          </Link>
                        </td>
                        <td className="product-name">
                          <Link href={`/product-details/${product.id}`}>
                            {product.name}
                          </Link>
                        </td>
                       
                        <td className="product-price"><span className="amount">${product.price}</span></td>
                        <td className="product-quantity">
                          <button onClick={() => dispatch(cart_product(product))} className="os-btn os-btn-black" type="submit">Add TO Cart</button>
                        </td>
                        <td className="product-subtotal">
                          <span className="amount">${product.price}</span>
                        </td>
                        <td className="product-remove"><button
                        onClick={async function deleteprodct(){const result = await API.graphql(graphqlOperation(deleteFavorite, {
                          input: {
                            id:product.id,
                          } 
                          
                        }))
                        console.log(result),
                        toast.error(`${product.name} remove from your wishlist`, {
                          position: 'top-left'
                        })}}><i className="fa fa-times"></i>
                        </button></td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </form>}
          </div>
        </div>
      </div>
    </section>
  </>;
};

export default WishlistArea;