
import React from 'react'
import { useFormik } from 'formik'; 
import ErrorMsg from '@/components/common/form/error-msg';
import { addproductSchema } from '@/components/common/form/validation-schema';
import { API,graphqlOperation,Storage  } from 'aws-amplify'
import { createProduct } from '@/src/graphql/mutations'; 
import { useState,useEffect,useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from './Dropzone'
import { useDropzone } from "react-dropzone";
import { addname ,addimage} from '@/redux/features/product-slice';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

export const Addproduct = () => {
  const [commentText,setCommentText] = useState("");
  const {name} = useSelector((state) => state.products);
  const [s3upload, sets3upload] = useState([]);
  const [imageArray, setimageArray] = useState([]);
  const dispath = useDispatch();
  const randomInt = Math.floor(Math.random() * 999);
  const propertyID=name!=""?name.replace(/\s/g, '-')+randomInt:randomInt;

  // add files to redux
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      s3upload.push(file);
   });
   console.log(s3upload);
  }, []);
 
  const [getname, setname] = useState(name);

  useEffect(() => {
    dispath(addname(getname));
}, [dispath, addname, getname]);



 const handleOnSubmit = async () => {

  s3upload.map(async img=>{
    try {
          await Storage.put(propertyID+'/'+img.name, img, {
            contentType: "image/png", // contentType is optional
          });
          console.log("uploaded");
        } catch (error) {
          console.log("Error uploading file: ", error);
        }
    })
        //get images urls
        const publicFilestest = await Storage.list('maha-sagh984',{level: 'public'}).then(
          ({ results }) =>  results
        )

    //get images urls
    const publicFiles = await Storage.list(propertyID,{level: 'public'}).then(
      ({ results }) =>  results
    )

    setimageArray([]);
    for (const key in publicFiles) {
      //console.log('public Files',publicFiles[key].key); 
      var signedUrl="https://elevia5ed9864c6f2d44ac9de605c316e167c8102801-dev.s3.eu-west-3.amazonaws.com/public/"+publicFiles[key].key;
      imageArray.push(signedUrl)
    }
    console.log('images urls',imageArray);

    //add to database

        try{ 
                
                const result = await API.graphql(graphqlOperation(createProduct, {
                  input: {
                    id: propertyID,
                    name:name,
                    price:values.price,
                    category:values.category,
                    description:commentText,
                    weight:values.weight,
                    dimension:values.dimension,
                    image: imageArray,
                    onpromo:  Boolean(values.onpromo),
                    promo: values.promo,
                    new:  Boolean(values.new),
                    quantity:  values.quantity,
                    custom: Boolean(values.custom),
                    trending: Boolean(values.trending),
                    feature:Boolean(values.feature),

                  },
                  authMode: GRAPHQL_AUTH_MODE.AWS_IAM

                }))
                setimageArray([]);
                console.log(result)
              }catch(err){
                console.log('error signing in', err)
                setimageArray([]);
              } 
    }
    
      
    const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
      initialValues: { trending:false,feature:false ,onpromo:false ,price:'',category:[],description:'',weight:'',dimension:'',customise:false,promo:'',new:false,quantity:'' },
      validationSchema: addproductSchema,
      onSubmit: handleOnSubmit,
    })
    return <>
    <section className="checkout-area pb-70">
    <div className="container">
  

      <form onSubmit={handleSubmit}>
      <label htmlFor="pass">name</label>
        <input id="name" className="form-control" name='name' value={getname}  onChange={(e) => setname(e.target.value)} 
       type="text" placeholder="Enter name..."   />
  
     
        <div className="col-md-6">
        <label htmlFor="trending">trending</label>
        <select  className="form-select" 
        name="trending"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.trending}
      >
        <option value="true" label="true">
          true
        </option>
        <option value="false" label="false">
          false
        </option>
      </select>
      {errors.trending && <div className="input-feedback">{errors.trending}</div>}
      </div>
  
      <div className="col-md-6">
      <label htmlFor="feature">feature</label>
      <select  className="form-select" 
      name="feature"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.feature}
    >
      <option value="true" label="true">
        true
      </option>
      <option value="false" label="false">
        false
      </option>
    </select>
    {errors.feature && <div className="input-feedback">{errors.feature}</div>}
    </div>

        <label htmlFor="price">price</label>
        <input id="price"  className="form-control" name='price' value={values.price} onChange={handleChange} 
        onBlur={handleBlur} type="number" placeholder="Enter price..." />
        {touched.price && <ErrorMsg error={errors.price} />}
  
        <div className="mt-10"></div>
        <label htmlFor="category">category</label>
        <select  className="form-select" 
        name="category"
        value={values.category}
        onChange={handleChange}
        onBlur={handleBlur}
        
      > 

        <option value="mortiers" label="mortiers">
        mortiers
        </option>
        <option value="planchette" label="planchette">
        planchette
        </option>
        <option value="couverts" label="couverts">
        couverts
        </option>
        <option value="bols" label="bols">
        bols
        </option>
        <option value="beurriers" label="beurriers">
         beurriers
       </option>
       <option value="plats" label="plats">
        plats
      </option>
      <option value="plateaux" label="plateaux">
      plateaux
      </option>
      <option value="divers" label="divers">
      divers
      </option>
      </select>
      {touched.category && <ErrorMsg error={errors.category} />}
   
        <div className="row">
        <div className="col-xl-12">
          <div className="contact__input">
            <label>description</label>
            <textarea value={commentText}
            onChange={e => setCommentText(e.target.value)} cols="30" rows="10"></textarea>
            {touched.description && <ErrorMsg error={errors.description} />}
          </div>
        </div>
      </div>
       
      <div className="row">

      <div className="col-md-6">
      <label htmlFor="name">weight <span>*</span></label>
      <input id='weight'  className="form-control" name='weight'  value={values.weight} onChange={handleChange} 
      onBlur={handleBlur} type="text" placeholder="weight..." />
      {touched.weight && <ErrorMsg error={errors.weight} />}
      </div>
      <div className="col-md-6">
      <label htmlFor="name">dimension <span>**</span></label>
      <input id='dimension'  className="form-control" name='dimension'  value={values.dimension} onChange={handleChange} 
      onBlur={handleBlur} type="text" placeholder="dimension..." />
      {touched.dimension && <ErrorMsg error={errors.dimension} />}
      </div>
      </div>

      <div className="row">
      <div className="col-md-6">
      <label htmlFor="onpromo">en promo</label>
      <select  className="form-select" 
      name="onpromo"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.onpromo}
    >
      <option value="true" label="true">
        true
      </option>
      <option value="false" label="false">
        false
      </option>
    </select>
    {errors.onpromo && <div className="input-feedback">{errors.onpromo}</div>}
    </div>

      <div className="col-md-6">
      <label htmlFor="promo"> promo <span>*</span></label>
      <input id="promo" className="form-control" name='promo' value={values.promo} onChange={handleChange} 
      onBlur={handleBlur} type="number" placeholder="promo..." />
      {touched.promo && <ErrorMsg error={errors.promo} />}
      </div>
   </div>
   <div className="mt-10"></div>
     <div className="row">
      <div className="col-md-6">
   
      <label htmlFor="onpromo">customise</label>
      <select className="form-select" 
      name="customise"
      value={values.customise}
      onChange={handleChange}
      onBlur={handleBlur} 
      style={{ display: "block" ,width:"50" }} >
      <option value="true" label="true">
        true
      </option>
      <option value="false" label="false">
        false
      </option>
    </select>
    {touched.customise && <ErrorMsg error={errors.customise} />}
    </div>
    <div className="col-md-6">  
    <label htmlFor="onpromo">new</label>
    <select className="form-select" 
    name="new"
    value={values.new}
    onChange={handleChange}
    onBlur={handleBlur} >
    <option value="true" label="true">
    true
    </option>
    <option value="false" label="false">
      false
    </option>
    </select>
    </div>
   </div>


  <div className="mt-10"></div>

  <label htmlFor="pass">image</label>
 
  <div className="row">
      <div className="col-xl-12">
      <Dropzone onDrop={onDrop} />
      </div>
     </div>






      <label htmlFor="quantity">quantity</label>
      <input id="quantity" type="number" className="form-control" name='quantity' value={values.quantity} onChange={handleChange} 
      onBlur={handleBlur}  />
      {touched.quantity && <ErrorMsg error={errors.quantity} />}


        <div className="mt-10"></div>
        <button type="submit" className="os-btn w-20">Add Product
        </button>
      </form>
   </div>
   </section>
      </>; 
}

export default Addproduct;