import ResetPWForm from '../common/form/resetPW-form';

const ResetPWArea = () => {
  return (
    <>
      <section className="login-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="basic-login">
                <h3 className="text-center mb-60">Reset your password</h3>
                {/* register form start */}
                <ResetPWForm/>
                {/* register form end */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPWArea;