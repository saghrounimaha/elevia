import SEO from "../components/seo";
import Wrapper from "../layout/wrapper";
import RegisterMain from '../components/register';
import { UserContext } from '../src/contexts/UserContext';
import { useContext } from 'react'
import { useRouter } from 'next/router';


const index = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  if(user) {
  
    router.push('/');
} else {
  return (
    <Wrapper>
          <SEO pageTitle={'Register'} />
          <RegisterMain/>
    </Wrapper>
 );

}

};

export default index;