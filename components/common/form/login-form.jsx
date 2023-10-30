import Link from 'next/link';
import { useFormik } from 'formik';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import ErrorMsg from './error-msg';
import { loginSchema } from './validation-schema';

const LoginForm = () => {
  // contact form
  const router = useRouter();
  async function  handleOnSubmit  (values, { resetForm }){
      try {
          const user = await Auth.signIn(values.email , values.password);
          toast.success(`connexion réussie`, {
            position: 'top-left'
          })
          router.push('/');
      } catch (error) {
        if(error.code =='UserNotConfirmedException'){
          router.push('/confirmation');
        }
          toast.error(`${error.message}`, {
            position: 'top-left'
          })
      }
    // alert(`${values.email + "\n" + values.password}`);
    resetForm()
  }
  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
    initialValues: { email: '',password:'' },
    validationSchema: loginSchema,
    onSubmit: handleOnSubmit,
  })
  return <>
    <form onSubmit={handleSubmit}>
    <label htmlFor="name">Email Address <span>*</span></label>
    <input id='email' name='email' value={values.email} onChange={handleChange} 
      onBlur={handleBlur} type="email" placeholder="Enter Email Adress..." />
      {touched.email && <ErrorMsg error={errors.email} />}

      <label htmlFor="pass">Password <span>*</span></label>
      <input id="pass" name='password' value={values.password} onChange={handleChange} 
      onBlur={handleBlur} type="password" placeholder="Enter password..." />
      {touched.password && <ErrorMsg error={errors.password} />}
      <div className="login-action mb-20 fix">
      <span className="forgot-login f-right">
        <Link href="/forgotpassword">Lost your password?</Link> 
      </span>
    </div>
   
      <button type="submit" className="os-btn w-100">Login Now</button>
      <div className="or-divide"><span>or</span></div>
      <Link href="/register" className="os-btn os-btn-black w-100">
      Register Now </Link>
    </form>
  </>;
};

export default LoginForm;