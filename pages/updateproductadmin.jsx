import SEO from '../components/seo';
import Wrapper from '../layout/wrapper';
import Updateprductmain from'../components/dashbordelevia/admin/updateproduct'

const addproductadmin = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'Update'} />
      <Updateprductmain/>
    </Wrapper>
  );
};

export default addproductadmin;