import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import ErrorMsg from '../common/form/error-msg';
import { loginCheckoutSchema } from '../common/form/validation-schema';
import { UserContext } from '../../src/contexts/UserContext';
import { useContext } from 'react'


const CouponArea = () => {
  const [checkoutLogin, setCheckoutLogin] = useState(false);
  const [checkoutCoupon, setCheckoutCoupon] = useState(false);
  const { user } = useContext(UserContext);

  const [couponerrormsg, setcouponerrormsg] = useState();
  async function  handleOnSubmit  (values, { resetForm }){
      try {
          const user = await Auth.signIn(values.checkoutemail , values.checkoutpassword);
          toast.success(`connexion réussie`, {
            position: 'top-left'
          })
      } catch (error) {
          console.log('error signing in', error);
          toast.error(`${error}`, {
            position: 'top-left'
          })
      }
    resetForm()
  }
    // use formik
    const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
      initialValues: { checkoutemail: '',checkoutpassword:'' },
      validationSchema: loginCheckoutSchema,
      onSubmit: handleOnSubmit,
    })
    function  handleSubmitcoupon  (event){
      setcouponerrormsg("Invalid coupon code");
      event.preventDefault();
    }
       
    
  return (
    <>
      <section className="coupon-area pt-100 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="coupon-accordion">
                {/* <!-- ACCORDION START --> */}
                {!user &&( <h3>Returning customer? <span onClick={()=> setCheckoutLogin(!checkoutLogin)} id="showlogin">Click here to login</span></h3>)}
                {user &&( <h3>Checkout</h3>)}
                {checkoutLogin && <div id="checkout-login" className="coupon-content">
                  <div className="coupon-info">
                    <p className="coupon-text">Quisque gravida turpis sit amet nulla posuere lacinia. Cras sed est
                      sit amet ipsum luctus.</p>
                    <form onSubmit={handleSubmit}>
                    <div>
                      <p className="form-row-first">
                      <label htmlFor="checkoutemail">Email Address <span>**</span></label>
                      <input id='checkoutemail' name='checkoutemail' value={values.checkoutemail} onChange={handleChange} 
                        onBlur={handleBlur} type="email" placeholder="Enter Email Adress..." />
                        {touched.checkoutemail && <ErrorMsg error={errors.checkoutemail} />}
                      </p>
                      </div>
                      <label htmlFor="checkoutpassword">Password <span>**</span></label>
                      <p className="form-row-last">
                     
                      <input id="checkoutpassword" name='checkoutpassword' value={values.checkoutpassword} onChange={handleChange} 
                      onBlur={handleBlur} type="password" placeholder="Enter password..." />
                      {touched.checkoutpassword && <ErrorMsg error={errors.checkoutpassword} />}
                      
                      </p>
                      <p className="form-row">
                        <button className="os-btn os-btn-black" type="submit">Login</button>
                      </p>
                    </form>
                  </div>
                </div>}
                {/* <!-- ACCORDION END --> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="coupon-accordion">
                {/* <!-- ACCORDION START --> */}
                <h3>Have a coupon? <span onClick={()=> setCheckoutCoupon(!checkoutCoupon)} id="showcoupon">Click here to enter your code</span></h3>
                {checkoutCoupon && <div id="checkout_coupon" className="coupon-checkout-content">
                  <div className="coupon-info">
                    <form onSubmit={handleSubmitcoupon}>
                    <div>
                      <p className="checkout-coupon">
                      <input name='couponcode' type="text" placeholder="Coupon Code" />
                      </p>
                      {<ErrorMsg error={couponerrormsg} />}
                      <button className="os-btn os-btn-black" type="submit">Apply Coupon</button>
                      </div>
                    </form>
                  </div>
                </div>}
                {/* <!-- ACCORDION END --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CouponArea;