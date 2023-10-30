import Footer from '../../layout/footers/footer';
import Header from '../../layout/headers/header';
import Breadcrumb from '../common/breadcrumb';
import DashboardeleviaArea from './dashbordelevia-area';
import { UserContext } from '../../src/contexts/UserContext';
import { useContext } from 'react'
import { useRouter } from 'next/router';



const index = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  let isAdmin=false;
  if(user==null){
    router.push('/404');
  }
  else if (user.signInUserSession.idToken.payload['cognito:groups']== null){
    router.push('/404');
  }else{
  user.signInUserSession.idToken.payload['cognito:groups'][0] === 'admin' ? isAdmin = true :false;
  }
  return (
    <>
      <Header />
      <main>
        <Breadcrumb title={'Dashboard'} subtitle={'Dashboard'} />

        {isAdmin &&(
        <DashboardeleviaArea/>
        )}


        {!isAdmin &&(
          <main>
          <Breadcrumb img="/assets/img/page-title/page-title-2.jpg" title={'Unauthorized access'} subtitle={' Error Page'} />
          <section className="error__area pt-60 pb-100">
            <div className="container">
              <div className="col-xl-8 offset-xl-2 col-lg-8 offset-lg-2">
                <div className="error__content text-center">
                  <div className="error__number">
                    <h1>403</h1>
                  </div>
                  <span>component not found</span>
                  <h2>Nothing To See Here!</h2>
                  <p>The page are looking for has been moved or doesn’t exist anymore, if you like you can return to our homepage. If the problem persists, please send us an email to <span className="highlight comment">basictheme@gmail.com</span></p>
  
                  <div className="error__search">
                    <input type="text" placeholder="Enter Your Text..." />
                    <button type="submit" className="os-btn os-btn-3 os-btn-black">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

          )}



      </main>
      <Footer />
    </>
  );
};

export default index;