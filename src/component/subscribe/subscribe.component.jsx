import React, { useEffect } from 'react'
import axios from 'axios'
import { urlEncode } from '../util';
import { WebInfoState } from '../web-info/web-info.context';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const Subscribe = () => {
  const { user } = WebInfoState();
  const cbInstance = window.Chargebee.init({
    site: 'bitbee-test'
  });

  const [first_name, last_name] = user.displayName.split(' ')
  const { email, uid } = user
  const cart = cbInstance.getCart();
  const customer = {
    first_name,
    last_name,
    email,
    billing_address: {
      first_name,
      last_name,
    },
    uid,
  };
  cart.setCustomer(customer);

    // cbInstance.setPortalSession(() => {
    //   // we have used axios for performing http requests
    //         // Hit your end point that returns portal session object as response
    //   // This sample end point will call the below api
    //   // https://apidocs.chargebee.com/docs/api/portal_sessions#create_a_portal_session
    //   return axios.post("https://api2.codetap.academy/generate_portal_session", urlEncode({})).then((response) => response.data);
    // });

  useEffect(() => {
  }, [])

  const handleSubscribe = () => {
    cbInstance.openCheckout({
      hostedPage: () => axios
        .post(`https://api2.codetap.academy/generate_checkout_new_url`, urlEncode({
          plan_id: 'wise_69',
          customer: JSON.stringify(customer),
        }))
        .then(({ data }) => {
          console.log(data)
          return data
        }),
      success: hostedPageId => {
        console.log(`hostedPageId`, hostedPageId)
      },
      close: () => {
        console.log(`Checkout closed`)
      },
      step: step => {
        console.log(`step`, step)
      }
    })
  }
  return (
    <div>
      <h1>Subscribe</h1>
      <button onClick={handleSubscribe}>Subscribe now</button>
    </div>
  )
}

export default Subscribe
