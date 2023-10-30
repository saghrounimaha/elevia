import SEO from '../components/seo';
import Wrapper from '../layout/wrapper';
import Listprductmain from'../components/dashbordelevia/admin/listproduct'

const Productlistadmin = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'List Product '} />
      <Listprductmain/>
    </Wrapper>
  );
};

export default Productlistadmin;