import Footer from '@/layout/footers/footer';
import Header from '@/layout/headers/header';
import UpdateProduct from './updateprodact';


const index = () => {
  return (
    <>
      <Header white_bg={true} />
      <main>
        <UpdateProduct  />
      </main>
      <Footer />
    </>
  );
};

export default index;