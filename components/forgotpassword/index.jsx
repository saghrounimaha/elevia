import Footer from '../../layout/footers/footer';
import Header from '../../layout/headers/header';
import Breadcrumb from '../common/breadcrumb';
import ForgotpasswordArea from './forgotpassword-area';

const index = () => {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb title={'mot de passe oublié'} subtitle={'mot de passe oublié'} />
        <ForgotpasswordArea/>
      </main>
      <Footer />
    </>
  );
};

export default index;