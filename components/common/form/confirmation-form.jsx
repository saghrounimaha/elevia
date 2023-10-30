import { useFormik } from 'formik';
import Link from 'next/link';
import ErrorMsg from './error-msg';
import { confirmationSchema } from './validation-schema';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useRef,useState } from 'react'
import { toast } from 'react-toastify';




const ConfirmationForm = () => {
  const router = useRouter();
  const emailInput = useRef(null)
  const [couponerrormsg, setcouponerrormsg] = useState();
  //contact form

  function isValidEmail(email) {
    if(/\S+@\S+\.\S+/.test(email)){
      resendConfirmationCode(email);
    }else{
      setcouponerrormsg("Invalid Email");
    }
  }

   async function  handleOnSubmit  (values){
  
    try {
        const {email,codedeconfirmation} = values;
        await Auth.confirmSignUp(email,codedeconfirmation);
        router.push('/login');
      } catch (error) {
        toast.error(`${error.message}`, {
          position: 'top-left'
        })
      }
  // alert(`${values.email + "\n" + values.password}`);
  resetForm()
}
  async function resendConfirmationCode(email) {
    try {
        await Auth.resendSignUp(email);
        console.log('code resent successfully');
    } catch (err) {
      toast.error(`${err.message}`, {
        position: 'top-left'
      })
    }
}
  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
    initialValues: {email:'',codedeconfirmation: '' },
    validationSchema: confirmationSchema,
    onSubmit: handleOnSubmit,
  })

  return <>
    <form onSubmit={handleSubmit}>

    
      <label htmlFor="email-id">Email Address<span>*</span></label>
      <input id='email' ref={emailInput} value={values.email} onChange={handleChange} onBlur={handleBlur} 
      placeholder="Enter Email Address..." type="email" />
      {touched.email && <ErrorMsg error={errors.email} />}  
      {<ErrorMsg error={couponerrormsg} />}
      

      <label htmlFor="name">Confirmation code <span>*</span></label>
      <input id='codedeconfirmation' value={values.codedeconfirmation} onChange={handleChange} onBlur={handleBlur}
        placeholder="Enter confirmation code " type="text" />
      {touched.codedeconfirmation && <ErrorMsg error={errors.codedeconfirmation} />}

      <div className="login-action mb-20 fix">
      <span className="forgot-login f-right">
        <a onClick={()=>isValidEmail(emailInput.current.value)} style={{ cursor: 'pointer' }} >Resend Code</a> 
      </span>
    </div>

      <div className="mt-10"></div>
      <button type="submit" className="os-btn w-100">confirm</button>
    
    </form>
  </>;

};

export default ConfirmationForm;