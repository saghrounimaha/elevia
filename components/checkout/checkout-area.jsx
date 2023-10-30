import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useCartInfo from '../../hooks/use-cart-info';
import { cartProducts } from '../../redux/features/cart-slice';
import { UserContext } from '../../src/contexts/UserContext';
import { useContext } from 'react'
import { useFormik } from 'formik';
import { chackoutSchema } from '../common/form/validation-schema';
import { Auth } from 'aws-amplify';
import ErrorMsg from '../common/form/error-msg';
import { toast } from 'react-toastify';
import { API,graphqlOperation,Storage  } from 'aws-amplify'
import { createOrders } from '@/src/graphql/mutations'; 


const countries = ['Tunisia']
const payment_accordion = [
  {
    id: 'headingOne',
    target: 'collapseOne',
    title: 'Cash on delivery',
    desc: "Paying on delivery, you can pay with cash on delivery to the postmen.",
    show: true,
  },
]

const CheckoutArea = () => {
  const [shipBox, setShipBox] = useState(false);
  const cartItems = useSelector(cartProducts);
  // const {
  //   id,
  //   promo,
  //   price,
  //   quantity}=useSelector((state) => state.cart.cartProducts);
  //   const [getPromo, setPromo] = useState(promo);
  //   const [getPrice, setPrice] = useState(price);
  //   const [getquantity, setQuantite] = useState(quantity);


  const { total } = useCartInfo();
  const { user } = useContext(UserContext);
  let First_Name_init='';
  let Last_Name_init='';
  let Street_address_init='';
  let State_init='';
  let Postcode_init='';
  let email_init='';
  let Phone_init='';
  let initvar=true;
if(user && initvar){
 First_Name_init=user.attributes.name;
 Last_Name_init=user.attributes.family_name ;
 Street_address_init=user.attributes.address ;
 State_init=user.attributes.zoneinfo;
 Postcode_init=user.attributes.zoneinfo;
 email_init=user.attributes.email ;
 Phone_init=user.attributes.phone_number;
 initvar=false;
}
  async function handleOnSubmit(values){
    if(user){
    await Auth.updateUserAttributes(user, {
      'name': values.First_Name,
      'family_name':values.Last_Name,
      'address': values.Street_address,
      'zoneinfo':values.State,
      'phone_number':values.Phone,
    })  
    }
     
   
      try{ 
        let idproduct=cartItems.map(item => item.id)
        let promo=cartItems.map(item => item.promo)
        let quantity=cartItems.map(item => item.quantity)     
      const result = await API.graphql(graphqlOperation(createOrders, {
        input: {
          idproduct:idproduct,
          quantity:quantity,
          telephone:values.Phone,
          address:values.Street_address,
          State:values.State,
          FirstName:values.First_Name,
          LastName:values.Last_Name,
          promo:promo,
          status:"",
          total:total
        }
      }))
      
      console.log(result)
      
    toast.success(`checkout réussie`, {
      position: 'top-left'
    })
    }catch(err){
      console.log('error signing in', err)
   
    } 

}





 
    // use formik
    const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
      initialValues: {
        First_Name: First_Name_init,
        Last_Name: Last_Name_init,
        Street_address: Street_address_init,
        State: State_init,
        Postcode: Postcode_init,
        email: email_init,
        Phone : Phone_init,
        First_Name2: '',
        Last_Name2: '',
        Street_address2: '',
        State2: '',
        Postcode2: '',
        email2: '',
        Phone2 : '',
        password : ''},
      validationSchema: chackoutSchema,
      onSubmit: handleOnSubmit,
    })
  return (
    <>
      <section className="checkout-area pb-70">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className="checkbox-form">
                  <h3>Billing Details</h3>
                  <div className="row">

                  <div className="col-md-6">
                  <div className="checkout-form-list">
                  <label htmlFor="name">First Name <span>**</span></label>
                  <input id='First_Name' name='First_Name'  value={values.First_Name} onChange={handleChange} 
                  onBlur={handleBlur} type="text" placeholder="First name..." />
                  {touched.First_Name && <ErrorMsg error={errors.First_Name} />}
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="checkout-form-list">
                  <label htmlFor="Last_Name">Last Name <span>**</span></label>
                  <input id="Last_Name" name='Last_Name' value={values.Last_Name} onChange={handleChange} 
                  onBlur={handleBlur} type="text" placeholder="Enter Last Name..." />
                  {touched.Last_Name && <ErrorMsg error={errors.Last_Name} />}
                  </div>
                  </div>
                  <div className="col-md-12">
                  <div className="checkout-form-list">
                  <label htmlFor="name">Street address <span>**</span></label>
                  <input id='Street_address' name='Street_address' value={values.Street_address} onChange={handleChange} 
                  onBlur={handleBlur} type="text" placeholder="Enter Street address..." />
                  {touched.Street_address && <ErrorMsg error={errors.Street_address} />}
                  </div>
                  </div>
                 
                  <div className="col-md-6">
                  <div className="checkout-form-list">
                  <label htmlFor="pass">Street address <span>**</span></label>
                  <input id="State" name='State' value={values.State} onChange={handleChange} 
                  onBlur={handleBlur} type="text" placeholder="Enter Street address..." />
                  {touched.State && <ErrorMsg error={errors.State} />}
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="checkout-form-list">
                  <label htmlFor="name">Postcode <span>**</span></label>
                  <input id='Postcode' name='Postcode' value={values.Postcode} onChange={handleChange} 
                  onBlur={handleBlur} type="text" placeholder="Postcode / Zip" />
                  {touched.Postcode && <ErrorMsg error={errors.Postcode} />}
                  </div>
                  </div>
                  <div className="col-md-12">
                  <div className="country-select">
                    <label>Country <span className="required">*</span></label>
                    <select>
                      {countries.map((country, index) => (
                        <option key={index} defaultValue={index}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>
                  <div className="col-md-6">
                  <div className="checkout-form-list">
                  <label htmlFor="name">Adresse e-mail <span>**</span></label>
                  <input id='email' name='email' value={values.email} onChange={handleChange} 
                  onBlur={handleBlur} type="text" placeholder="Votre Adresse e-mail..." />
                  {touched.email && <ErrorMsg error={errors.email} />}
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="checkout-form-list">
                  <label htmlFor="pass">Phone <span>**</span></label>
                  <input id="Phone" name='Phone' value={values.Phone} onChange={handleChange} 
                  onBlur={handleBlur} type="text" placeholder="Enter Phone..." />
                  {touched.Phone && <ErrorMsg error={errors.Phone} />}
                  </div>
                  </div>
                  </div>
                  <div className="different-address">
                    <div className="ship-different-title">
                      <h3>
                        <label>Ship to a different address?</label>
                        <input onClick={() => setShipBox(!shipBox)} id="ship-box" type="checkbox" />
                      </h3>
                    </div>
                    {shipBox && <div id="ship-box-info">
                      <div className="row">
                 
                      <div className="col-md-6">
                      <div className="checkout-form-list">
                      <label htmlFor="name">First Name <span>**</span></label>
                      <input id='First_Name2' name='First_Name2' value={values.First_Name2} onChange={handleChange} 
                      onBlur={handleBlur} type="text" placeholder="First name..." />
                      {touched.First_Name2 && <ErrorMsg error={errors.First_Name2} />}
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="checkout-form-list">
                      <label htmlFor="Last_Name2">Password <span>**</span></label>
                      <input id="Last_Name2" name='Last_Name2' value={values.password} onChange={handleChange} 
                      onBlur={handleBlur} type="text" placeholder="Enter Last Name..." />
                      {touched.Last_Name2 && <ErrorMsg error={errors.Last_Name2} />}
                      </div>
                      </div>
                      <div className="col-md-12">
                      <div className="checkout-form-list">
                      <label htmlFor="name">Adresse e-mail <span>**</span></label>
                      <input id='Street_address2' name='Street_address2' value={values.Street_address2} onChange={handleChange} 
                      onBlur={handleBlur} type="text" placeholder="Votre Adresse e-mail..." />
                      {touched.Street_address2 && <ErrorMsg error={errors.Street_address2} />}
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="checkout-form-list">
                      <label htmlFor="pass">Password <span>**</span></label>
                      <input id="State2" name='State2' value={values.State2} onChange={handleChange} 
                      onBlur={handleBlur} type="text" placeholder="Enter password..." />
                      {touched.State2 && <ErrorMsg error={errors.State2} />}
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="checkout-form-list">
                      <label htmlFor="name">Adresse e-mail <span>**</span></label>
                      <input id='Postcode2' name='Postcode2' value={values.Postcode2} onChange={handleChange} 
                      onBlur={handleBlur} type="text" placeholder="Votre Adresse e-mail..." />
                      {touched.Postcode2 && <ErrorMsg error={errors.Postcode2} />}
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="checkout-form-list">
                      <label htmlFor="name">Adresse e-mail <span>**</span></label>
                      <input id='email2' name='email2' value={values.email2} onChange={handleChange} 
                      onBlur={handleBlur} type="text" placeholder="Votre Adresse e-mail..." />
                      {touched.email2 && <ErrorMsg error={errors.email2} />}
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="checkout-form-list">
                      <label htmlFor="pass">Password <span>**</span></label>
                      <input id="Phone2" name='Phone2' value={values.Phone2} onChange={handleChange} 
                      onBlur={handleBlur} type="text" placeholder="Enter password..." />
                      {touched.Phone2 && <ErrorMsg error={errors.Phone2} />}
                      </div>
                      </div>
            
    

                      </div>
                    </div>}
           
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="your-order mb-30 ">
                  <h3>Your order</h3>
                  <div className="your-order-table table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th className="product-name">Product</th>
                          <th className="product-total">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index} className="cart_item">
                            <td className="product-name">
                              {item.title} <strong className="product-quantity"> × {item.quantity}</strong>
                            </td>
                            <td className="product-total">
                              <span className="amount">${item.price}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="cart-subtotal">
                          <th>Cart Subtotal</th>
                          <td><span className="amount">${total}</span></td>
                        </tr>
                        <tr className="order-total">
                          <th>Order Total</th>
                          <td><strong><span className="amount">${total}</span></strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="payment-method">
                    <div className="accordion" id="accordionExample">
                      {payment_accordion.map((item, index) => (
                        <div key={index} className="card">
                          <div className="card-header" id={item.id}>
                            <h5 className="mb-0">
                              <button className={`btn-link ${item.show ? '' : 'collapsed'}`}
                                type="button" data-bs-toggle="collapse"
                                data-bs-target={`#${item.target}`} aria-expanded="true"
                                aria-controls={`${item.target}`}>
                                {item.title}
                              </button>
                            </h5>
                          </div>

                          <div id={`${item.target}`} className={`collapse ${item.show ? 'show' : ''}`}
                            aria-labelledby={item.id} data-bs-parent="#accordionExample">
                            <div className="card-body">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="order-button-payment mt-20">
                      <button type="submit" className="os-btn os-btn-black">Place order</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;