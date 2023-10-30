
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listOrders } from '@/src/graphql/queries';
import { deleteOrders, updateOrders } from '@/src/graphql/mutations';

const OrdersList = () => {
  const [productlist, setProductlist] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await API.graphql(graphqlOperation(listOrders));
        setProductlist(productData.data.listOrders.items);
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };

    loadData();
  }, []);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      if (status === 'refused') {
        // Delete the order if it is refused
        await API.graphql(
          graphqlOperation(deleteOrders, {
            input: {
              id: orderId,
            },
          })
        );
        console.log('Order deleted:', orderId);
        
        // Remove the order from the local state
        setProductlist((prevList) => prevList.filter((order) => order.id !== orderId));
      } else {
        // Update the order status
        const result = await API.graphql(
          graphqlOperation(updateOrders, {
            input: {
              id: orderId,
              status: status,
            },
          })
        );
        console.log('Order status updated:', result);
    
        // Update the status in the local state
        setProductlist((prevList) =>
          prevList.map((order) => {
            if (order.id === orderId) {
              return { ...order, status: status };
            }
            return order;
          })
        );
      }
    } catch (error) {
      console.log('Error updating order status:', error);
    }
  };
  

  const handleDeleteOrder = async (orderId) => {
    try {
      const result = await API.graphql(graphqlOperation(deleteOrders, {
        input: {
          id: orderId,
        },
      }));
      console.log('Order deleted:', result);

      // Remove order from local state
      setProductlist(prevList => prevList.filter(order => order.id !== orderId));
    } catch (error) {
      console.log('Error deleting order:', error);
    }
  };

  return (
    <section className="cart-area pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {!productlist.length ? (
              <div className='text-center'>
                <h3>No products</h3>
              </div>
            ) : (
              <form onSubmit={e => e.preventDefault()}>
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">OrderID</th>
                        <th className="product-thumbnail">IDProduct</th>
                        <th className="product-price">Promo %</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                        <th className="product-subtotal">Status</th>
                        <th className="product-remove">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productlist.map((product) => (
                        <tr key={product.id}>
                          <td className="product-thumbnail">
                            <span className="amount"><br/>{product.id}</span>
                          </td>
                          <td className="product-thumbnail">
                            {product.idproduct.map((id, index) => (
                              <span key={index} className="amount"><br/>{id}</span>
                            ))}
                          </td>
                          <td className="product-price">
                            {product.promo.map((promo, index) => (
                              <span key={index} className="amount"><br/>{promo}</span>
                            ))}
                          </td>
                          <td className="product-quantity">
                            {product.quantity.map((quantity, index) => (
                              <span key={index} className="amount"><br/>{quantity}</span>
                            ))}
                          </td>
                          <td className="product-subtotal">
                            <span className="amount">{product.total}TND</span>
                          </td>
                          <td className="product-subtotal">
                            <select
                              value={product.status}
                              onChange={(e) => handleUpdateOrderStatus(product.id, e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="accepted">Accepted</option>
                              <option value="refused">Refused</option>
                            </select>
                          </td>
                          <td className="product-remove">
                            <ul className="view_edit_delete_list mb0">
                              <li
                                className="list-inline-item"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete Order"
                                onClick={() => handleDeleteOrder(product.id)}
                              >
                                <a href="#">
                                  <span className="fa fa-times"></span>
                                </a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersList;
