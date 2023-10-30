import { API, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { createSubscribe } from '@/src/graphql/mutations';
import {useState} from 'react' 
import { UserContext } from '@/src/contexts/UserContext'; 
import { useContext } from 'react'


const SubscribeArea = ({df,h4}) => {
  
    const { user } = useContext(UserContext)

  const [email, setEmail] = useState('');

  async function  handleSubmit  (e){
    e.preventDefault();
    try {
      const result = await API.graphql({
          query: createSubscribe,
          variables: { input: {email :email} },
        
          authMode:  user ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS : GRAPHQL_AUTH_MODE.AWS_IAM,
      
        })} 
    catch (error) {
        console.log('error adding message', error);
    }
}


  return (
    <>
      <section className={`subscribe__area pb-100 ${df ? 'grey-bg box-m-15' : ''} ${h4 ? 'position-relative' : ''}`}>
        <div className={`container ${h4 ? 'custom-container' : ''}`}>
          <div className={`subscribe__inner ${df ? 'subscribe__inner-2 pt-120' : 'pt-95'}`}>
            <div className="row">
              <div className="col-xl-8 offset-xl-2 col-lg-8 offset-lg-2">
                <div className="subscribe__content text-center">
                  <h2>Get Discount Info</h2>
                  <p>Subscribe to the Outstock mailing list to receive updates on new arrivals, special offers and other
                    discount information.</p>
                  <div className="subscribe__form">
                    <form onSubmit={handleSubmit}>
                      <input type="email" placeholder="Subscribe to our newsletter..."  onChange={(event) =>setEmail(event.target.value)}/>
                      <button type="submit" className="os-btn os-btn-2 os-btn-3">subscribe</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubscribeArea;