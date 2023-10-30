import { useFormik } from 'formik';
import Link from 'next/link';
import ErrorMsg from './error-msg';
import { resetPWSchema } from './validation-schema';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const ResetPWForm = () => {
  // contact form
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailID = searchParams.get('emailID');
  let text="";
  if(emailID){
    let buff = new Buffer(emailID, 'base64');
    text = buff.toString('ascii');
  }else{
    router.push('/forgotpassword');
}
  async function  handleOnSubmit  (values, { resetForm }){

    try {
      await Auth.forgotPasswordSubmit(text,values.code,values.confirmnewPwd);
      //  .then((data) => console.log(data))
      //  .catch((err) => console.log(err));
       toast.success(`Password changed`, {
        position: 'top-left'
      })
        router.push('/login');
      } catch (error) {
      toast.error(`${error.message}`, {
        position: 'top-left'
      })
    }
  // alert(`${values.email + "\n" + values.password}`);
  resetForm()
}
  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
    initialValues: { code: '', new_password: '', confirmnewPwd: '' },
    validationSchema: resetPWSchema,
    onSubmit: handleOnSubmit,
  })
  return <>
    <form onSubmit={handleSubmit}>
     

    <label htmlFor="name"> confirmation code <span>*</span></label>
    <input id='code' value={values.code} onChange={handleChange} onBlur={handleBlur}
      placeholder="Enter confirmation code" type="text" />
    {touched.code && <ErrorMsg error={errors.code} />}

      <label htmlFor="pass">new password <span>*</span></label>
      <input id="pass" name='new_password' value={values.password} onChange={handleChange} 
      onBlur={handleBlur} type="new_password" placeholder="Enter password..." />
      {touched.new_password && <ErrorMsg error={errors.new_password} />}

      <label htmlFor="pass">confirm new password <span>*</span></label>
      <input id="pass" name='confirmnewPwd' value={values.password} onChange={handleChange} 
      onBlur={handleBlur} type="confirmnewPwd" placeholder="Enter new password..." />
      {touched.confirmnewPwd && <ErrorMsg error={errors.confirmnewPwd} />}


      <div className="mt-10"></div>
      <button type="submit" className="os-btn w-100">Send new code</button>
      <div className="or-divide"><span>or</span></div>
      <Link href="/forgotpassword" className="os-btn os-btn-black w-100">
        forgot password
      </Link>
    </form>
  </>;
};

export default ResetPWForm;