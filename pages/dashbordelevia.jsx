import SEO from '../components/seo';
import Wrapper from '../layout/wrapper';
import Dashboardelevia from '../components/dashbordelevia';

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'Wishlist'} />
      <Dashboardelevia/>
    </Wrapper>
  );
};

export default index;