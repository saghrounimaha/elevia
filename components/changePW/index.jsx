import Footer from '../../layout/footers/footer';
import Header from '../../layout/headers/header';
import Breadcrumb from '../common/breadcrumb';
import ChangePWArea from './change-area';

const index = () => {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb title={'Register'} subtitle={'Register'} />
        <ChangePWArea/>
      </main>
      <Footer />
    </>
  );
};

export default index;