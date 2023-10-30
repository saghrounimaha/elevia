import SEO from '../components/seo';
import Wrapper from '../layout/wrapper';
import ShopProduct from '@/components/common/product/shop-product';
import { useRouter } from 'next/router'
import ShopMain from '../components/shop';

const index = () => {
    const router  = useRouter();
   const catg=['cuisine','couverts','bols','beurriers','plateaux','divers']
   if (catg.indexOf(router.query.id)!==-1){
       //console.log(router.query.id)
       return (
        <Wrapper>
        <SEO pageTitle={'Shop'} />
        <ShopMain />
      </Wrapper>
       );
     }
//  else{
//    router.push("/404")
//  }
};

export default index;