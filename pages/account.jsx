
import Wrapper from '../layout/wrapper';
import AccountMain from '../components/account';
import { UserContext } from '../src/contexts/UserContext';
import { useContext } from 'react'
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  if(!user) {
    router.push('/login');
} else {
  return (
    <Wrapper>
          <AccountMain/>
    </Wrapper>
 );

}
};

export default index;