import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './screens/CheckoutForm';

// const stripePromise = loadStripe(
//   'pk_test_51KdFxaSEBfRbFcW68zi3GLcX7ISrgRQnq8czqESnJ2iPTnh6R9IV9fLZhyVTSYd5nY50uSywR1qRw0SjSnWrkMPU00zhlTXNSQ'
// );

// function App() {
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: '{{sk_test_51KdFxaSEBfRbFcW6Hi0Sn4xvovlVwOUM1Vq5KBhDthm2TvWKdESEMVoDQvOGDxpUMMnkJyfBoi0GvPhNC7M1JatC004qffsCIx}}',
//   };
// const options = {
//   // passing the client secret obtained from the server
//   clientSecret:
//     '{{sk_test_51KdFxaSEBfRbFcW6Hi0Sn4xvovlVwOUM1Vq5KBhDthm2TvWKdESEMVoDQvOGDxpUMMnkJyfBoi0GvPhNC7M1JatC004qffsCIx}}',
// };
{
  /* <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements> */
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
