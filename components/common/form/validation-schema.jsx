import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  msg: Yup.string().required().min(20).label("Message"),
});


export const loginSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

export const loginCheckoutSchema = Yup.object().shape({
  checkoutemail: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});


export const registerSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

export const couponSchema = Yup.object().shape({
  couponcode: Yup.string().required().length(5790).label("couponcode"),
});

export const confirmationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  codedeconfirmation: Yup.string().required().length(6).label("Code"),
});

export const ForgotpasswordSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),

});

export const resetPWSchema = Yup.object().shape({
  code: Yup.string().required().length(6).label("code"),
  new_password: Yup.string().required('Password is mendatory').min(3, 'Password must be at 3 char long'),
  confirmnewPwd: Yup.string().required('Password is mendatory').oneOf([Yup.ref('new_password')], 'Passwords does not match'),
 
});  

export const changePWSchema = Yup.object().shape({
  oldpassword: Yup.string().required().min(8).label("Password"),
  new_password: Yup.string().required('Password is mendatory').min(8, 'Password must be at 3 char long'),
  confirmnewPwd: Yup.string().required('Password is mendatory').oneOf([Yup.ref('confirmnewPwd')], 'Passwords does not match'),
 
});  

export const blogSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().required().min(10).label("Subject"),
  msg: Yup.string().required().min(20).label("Message"),
});

export const chackoutSchema = Yup.object().shape({
  First_Name: Yup.string().required().label("First Name"),
  Last_Name: Yup.string().required().label("Last Name"),
  Street_address: Yup.string().required().label("Street address").min(10),
  State: Yup.string().required().label("State"),
  Phone: Yup.string().required().label("Phone"),

});

export const accountSchema = Yup.object().shape({
  First_Name: Yup.string().required().label("First Name"),
  Last_Name: Yup.string().required().label("Last Name"),
  Street_address: Yup.string().required().label("Street address").min(10),
  State: Yup.string().required().label("State"),
  Phone: Yup.string().required().label("Phone"),

});

export const addproductSchema = Yup.object().shape({
  trending:Yup.boolean().required().label("trending is required!"),
  feature:Yup.boolean().required().label("trending is required!"),
  price: Yup.number().required().label("price"),
  weight: Yup.string().required().label("weight"),
  dimension:Yup.string().required().label("dimension"),
  onpromo: Yup.boolean().required().label("onpromo"),
  promo: Yup.number().required().label("promo"),
  customise:Yup.boolean().required().label("customise is required!"),
  new:Yup.boolean().required().label("new is required!"),
  quantity:Yup.number().required().label("quantity is required!"),
});


