import { useFormik } from 'formik';
import Link from 'next/link';
import ErrorMsg from './error-msg';
import { registerSchema } from './validation-schema';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

const RegisterForm = () => {
  // contact form
  const router = useRouter();
  async function  handleOnSubmit  (values, { resetForm }){

    try {
        const user = await Auth.signUp(values.email , values.password);
        console.log('signing in successfully', user.email);
        router.push('/confirmation');
    } catch (error) {
        console.log('error signing in', error);
    }
  // alert(`${values.email + "\n" + values.password}`);
  resetForm()
}
  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: handleOnSubmit,
  })
  return <>
    <form onSubmit={handleSubmit}>
    <label htmlFor="name">Username <span>*</span></label>
    <input id='name' value={values.name} onChange={handleChange} onBlur={handleBlur}
        placeholder="Enter Username" type="text" />
      {touched.name && <ErrorMsg error={errors.name} />}

      <label htmlFor="email-id">Email Address <span>*</span></label>
      <input id='email' value={values.email} onChange={handleChange} onBlur={handleBlur} 
      placeholder="Votre Adresse e-mail..." type="email" />
      {touched.email && <ErrorMsg error={errors.email} />}

      <label htmlFor="pass">Password <span>*</span></label>
      <input id="pass" name='password' value={values.password} onChange={handleChange} 
      onBlur={handleBlur} type="password" placeholder="Enter password..." />
      {touched.password && <ErrorMsg error={errors.password} />}

      <div className="mt-10"></div>
      <button type="submit" className="os-btn w-100">Register Now</button>
      <div className="or-divide"><span>or</span></div>
      <Link href="/login" className="os-btn os-btn-black w-100">
        login 
      </Link>
    </form>
  </>;
};

export default RegisterForm;