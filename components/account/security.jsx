import { useFormik } from 'formik';
import ErrorMsg from '../common/form/error-msg';
import { changePWSchema } from '../common/form/validation-schema';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

const AccountSecurity = () => {
  // contact form
  const router = useRouter();
  function  handleOnSubmit  (values, { resetForm }){
      Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, values.oldpassword,values.new_password);
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
      };
    
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
    initialValues: { oldpassword: '', new_password:'',confirmnewPwd: '' },
    validationSchema: changePWSchema,
    onSubmit: handleOnSubmit,
  })
  return <>
  <div class="mb-3">
  <h4 className="text-center mb-30">Change password</h4>
    <form onSubmit={handleSubmit}>
    
    <label htmlFor="pass">Password</label>
      <input id="oldpassword" className="form-control" name='oldpassword' value={values.oldpassword} onChange={handleChange} 
      onBlur={handleBlur} type="oldpassword" placeholder="Enter old password..." />
      {touched.oldpassword && <ErrorMsg error={errors.oldpassword} />}

      <label htmlFor="new_password">new_password</label>
      <input id="new_password"  className="form-control" name='new_password' value={values.new_password} onChange={handleChange} 
      onBlur={handleBlur} type="new_password" placeholder="Enter new password..." />
      {touched.new_password && <ErrorMsg error={errors.new_password} />}

      <label htmlFor="confirmnewPwd">confnew_password</label>
      <input id="confirmnewPwd" className="form-control" name='confirmnewPwd' value={values.confirmnewPwd} onChange={handleChange} 
      onBlur={handleBlur} type="new_password" placeholder="Enter new password..." />
      {touched.confirmnewPwd && <ErrorMsg error={errors.confirmnewPwd} />}

      <div className="mt-10"></div>
      <button type="submit" className="os-btn w-20">Change password
      </button>
    </form>
    </div>
  </>;
};

export default AccountSecurity;