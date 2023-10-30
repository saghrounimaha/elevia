import SEO from "../../components/seo";
import Wrapper from "../../layout/wrapper";
import updateMain from '../../components/dashbordelevia/admin/updateproduct'

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'Blog Details'} />
      <updateMain/>
    </Wrapper>
  );
};

export default index;