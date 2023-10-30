import ForgotpasswordForm from '../common/form/forgotpassword-form';
import Footer from '../../layout/footers/footer';
import Header from '../../layout/headers/header';
import Breadcrumb from '../common/breadcrumb';

const ForgotpasswordArea = () => {
  return (
    <>
      <section className="login-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="basic-login">
                <h3 className="text-center mb-60">Forgot password</h3>
                {/* register form start */}
                <ForgotpasswordForm/>
                {/* register form end */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotpasswordArea;