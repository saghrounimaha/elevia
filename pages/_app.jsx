import { Provider } from 'react-redux'
import { store } from '../redux/store';
import { ToastContainer } from 'react-toastify';
import {persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {Amplify} from "aws-amplify"
import awsconfig from "../src/aws-exports"
import '@aws-amplify/ui-react/styles.css'
import { Authenticator } from '@aws-amplify/ui-react';
import { UserContextProvider } from '../src/contexts/UserContext'
Amplify.configure({...awsconfig,ssr:true})

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
import '../styles/index.scss';
import AppProvider from '../context/AppContext';
import Preloader from '../components/preloader';

let persistor = persistStore(store)

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Preloader/>} persistor={persistor}>
        <AppProvider>
        <UserContextProvider>
            <Component {...pageProps} />
            <ToastContainer />
        </UserContextProvider>
          </AppProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp