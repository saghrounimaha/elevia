import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UpdateProduct from '@/components/dashbordelevia/admin/updateproduct/updateprodact';
import SEO from '../../components/seo';
import { blogs } from '../../data';
import Footer from '../../layout/footers/footer';
import Header from '../../layout/headers/header';
import { useGetDetailProductQuery } from '@/redux/features/propertiesApi';
const Update = () => {
  const router = useRouter();
  const id = router.query.id;
  const [product, setproduct] = useState();
  const [productData, setProductData] = useState();
  const [productID, setProductID] = useState();
   const { data, isLoading, isFetching } = useGetDetailProductQuery({IDparam :product});
    useEffect(() => {
       if (!isLoading && !isFetching && data){
            setProductData(data.data.getProduct);
        }
      }, [data]);


  useEffect(() => {
    if (!id) (<h1>Loading...</h1>)

    else (setproduct(id))

    return () => {

    };
  }, [id]);
  
  return (
    <>
      <SEO pageTitle={' Update product '} />
      <Header white_bg={true} />
      <main>
        <UpdateProduct item={productData} />
      </main>
      <Footer />
    </>
  
  );

};

export default Update;