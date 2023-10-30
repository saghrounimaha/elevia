import Footer from '../../layout/footers/footer';
import Header from '../../layout/headers/header';
import Breadcrumb from '../common/breadcrumb';
import ResetPWArea from './resetPW-area';

const index = () => {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb title={'Reset password'} subtitle={'Reset password'} />
        <ResetPWArea/>
      </main>
      <Footer />
    </>
  );
};

export default index;