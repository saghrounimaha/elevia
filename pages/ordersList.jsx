import SEO from '../components/seo';
import Wrapper from '../layout/wrapper';
import Breadcrumb from '@/components/common/breadcrumb';
import OrdersLists from '@/components/dashbordelevia/admin/orderlist';

const Productlistadmin = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'Wishlist'} />
      <Breadcrumb title={'Product List'} subtitle={' Product List'} />
    
      <OrdersLists/>
      
    </Wrapper>
  );
};

export default Productlistadmin;