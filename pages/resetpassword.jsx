import SEO from "../components/seo";
import Wrapper from "../layout/wrapper";
import ResetPWMain from '../components/resetPW';


const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'Reset password'} />
      <ResetPWMain/>
    </Wrapper>
  );
};

export default index;