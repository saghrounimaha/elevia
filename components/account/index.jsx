import React from 'react';
import Footer from '../../layout/footers/footer';
import Header from '../../layout/headers/header';
import Breadcrumb from '../common/breadcrumb';
import AccountArea from './account-area'

const index = () => {
  return (
    <>
      <Header/>
      <main>
        <Breadcrumb title={'Your Account'} subtitle={'Account'} />
        <AccountArea/>
      </main>
      <Footer/>
    </>
  );
};

export default index;