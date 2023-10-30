import { useFormik } from 'formik';
import ErrorMsg from './error-msg';
import { ForgotpasswordSchema } from './validation-schema';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';




const ForgotpasswordForm = () => {
  const router = useRouter();
  //contact form
   async function  handleOnSubmit  (values){
    let data = values.email;
    let buff = new Buffer(data);
    var encodedemail  = buff.toString('base64');


    try {
        //const user = Auth.currentAuthenticatedUser({bypassCache: true});
        await Auth.forgotPassword(values.email);
        router.push('/resetpassword?emailID='+encodedemail);
      } catch (error) {
        toast.error(`${error.message}`, {
          position: 'top-left'
        })
      }
  // alert(`${values.email + "\n" + values.password}`);
  //resetForm()
}
  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
    initialValues: {email:''},
    validationSchema: ForgotpasswordSchema,
    onSubmit: handleOnSubmit,
  })
  return <>
    <form onSubmit={handleSubmit}>

    
      <label htmlFor="email-id">Adresse e-mail<span>*</span></label>
      <input id='email' value={values.email} onChange={handleChange} onBlur={handleBlur} 
      placeholder="Votre Adresse e-mail..." type="email" />
      {touched.email && <ErrorMsg error={errors.email} />}  
      <div className="mt-10"></div>
      <button type="submit" className="os-btn w-100">Rechercher</button>
      
    </form>
  </>;

};

export default ForgotpasswordForm;