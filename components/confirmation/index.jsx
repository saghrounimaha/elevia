import Footer from '../../layout/footers/footer';
import Header from '../../layout/headers/header';
import Breadcrumb from '../common/breadcrumb';
import ConfirmationArea from './confirmation-area';

const index = () => {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb title={'Register'} subtitle={'Register'} />
        <ConfirmationArea/>
      </main>
      <Footer />
    </>
  );
};

export default index;