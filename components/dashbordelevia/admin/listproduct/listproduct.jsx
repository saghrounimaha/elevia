import Link from 'next/link';
import React from 'react';
import { API,graphqlOperation,Storage   } from 'aws-amplify'
import { listProducts } from '@/src/graphql/queries';
import { deleteProduct } from '@/src/graphql/mutations';
import {useEffect,useState } from "react";
const ListProduct = () => {
  const [productlist, setProductlist] = useState();


  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      const productData=await API.graphql(graphqlOperation(listProducts))

      setProductlist(productData.data.listProducts.items);
    };
    // then call it here
    loadData();
  }, []);
  const handleSubmit = e => e.preventDefault();
  return <>
  <section className="cart-area pt-100 pb-100">
    <div className="container">
      <div className="row">
        <div className="col-12">
        {!productlist &&
          <div className='text-center'>
            <h3>No  product</h3>
          </div>
        }
        {productlist && <form onSubmit={handleSubmit}>
            <div className="table-content table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Images</th>
                    <th className="cart-product-name">Product</th>
                    <th className="product-price">Unit Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-subtotal">Total</th>
                    <th className="product-remove">Update</th>
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
                      <span className="amount">{product.quantity}</span>
                      </td>
                      <td className="product-subtotal">
                        <span className="amount">${product.price}</span>
                      </td>
                      <td className="product-remove"><Link href={`/updateproduct/${product.id}`} 
                     ><i class="fa fa-pencil fa-fw"></i>
                    </Link></td>
                      <td className="product-remove"><button
                        onClick={async function deleteprodct(){const result = await API.graphql(graphqlOperation(deleteProduct, {
                          input: {
                            id:product.id,
                          }
                        }))
                        console.log(result)}}
                       ><i className="fa fa-times"></i>
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

export default ListProduct;