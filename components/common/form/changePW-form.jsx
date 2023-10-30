import { useFormik } from 'formik';

import ErrorMsg from './error-msg';
import { changePWSchema } from './validation-schema';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

const ChangePWForm = () => {
  // contact form
  const router = useRouter();
  function  handleOnSubmit  (values, { resetForm }){
      Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, values.oldpassword,values.new_password);
        router.push('/login');
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
      };
    
  // alert(`${values.email + "\n" + values.password}`);
 // resetForm()

  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
    initialValues: { oldpassword: '', new_password:'',confirmnewPwd: '' },
    validationSchema: changePWSchema,
    onSubmit: handleOnSubmit,
  })
  return <>
    <form onSubmit={handleSubmit}>
    
    <label htmlFor="pass">Password <span>**</span></label>
      <input id="oldpassword" name='oldpassword' value={values.oldpassword} onChange={handleChange} 
      onBlur={handleBlur} type="oldpassword" placeholder="Enter old password..." />
      {touched.oldpassword && <ErrorMsg error={errors.oldpassword} />}

      <label htmlFor="new_password">new_password <span>**</span></label>
      <input id="new_password" name='new_password' value={values.new_password} onChange={handleChange} 
      onBlur={handleBlur} type="new_password" placeholder="Enter new password..." />
      {touched.new_password && <ErrorMsg error={errors.new_password} />}

      <label htmlFor="confirmnewPwd">confnew_password <span>**</span></label>
      <input id="confirmnewPwd" name='confirmnewPwd' value={values.confirmnewPwd} onChange={handleChange} 
      onBlur={handleBlur} type="new_password" placeholder="Enter new password..." />
      {touched.confirmnewPwd && <ErrorMsg error={errors.confirmnewPwd} />}


      <div className="mt-10"></div>
      <button type="submit" className="os-btn w-100">to validate
      </button>
    </form>
  </>;
};

export default ChangePWForm;