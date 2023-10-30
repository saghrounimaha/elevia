import SEO from "../components/seo";
import Wrapper from "../layout/wrapper";
import ConfirmationMain from '../components/confirmation';



const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'Register'} />
      <ConfirmationMain/>
    </Wrapper>
  );
};

export default index;