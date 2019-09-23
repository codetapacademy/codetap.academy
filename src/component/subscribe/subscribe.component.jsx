import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { urlEncode } from '../util';
import { WebInfoState } from '../web-info/web-info.context';
import subscribeConfig from './subscribe.config'
import { StyledSubscribeList, StyledSubscribeItem, StyledSubscribeTitle, StyledSubscribePrice, StyledSubscribeRangeWrapper, StyledSubscribeButton } from './subscribe.style';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const cbInstance = window.Chargebee.init({
  site: 'bitbeeuk'
})

const Subscribe = () => {
  const [subscribeList, updateSubscribeList] = useState(subscribeConfig)
  const [customer, updateCustomer] = useState(subscribeConfig)
  const [accepted, setAccepted] = useState(subscribeConfig)
  const { user } = WebInfoState();

  useEffect(() => {
    const [first_name, last_name] = ((user && user.displayName) || ' ').split(' ')
    const { email, uid, accepted } = user
    setAccepted(accepted)

    const cart = cbInstance.getCart();
    updateCustomer({
      first_name,
      last_name,
      email,
      billing_address: {
        first_name,
        last_name,
      },
      uid,
    });
    cart.setCustomer(customer);
  }, [])

  const handlePortal = () => {
    cbInstance.createChargebeePortal().open({
      loaded: () => {
        console.log('createChargebeePortal loaded')
      }
    })
    // cbInstance.setPortalSession(() => {
    //   // we have used axios for performing http requests
    //   // Hit your end point that returns portal session object as response
    //   // This sample end point will call the below api
    //   // https://apidocs.chargebee.com/docs/api/portal_sessions#create_a_portal_session
    //   return axios
    //     .post("https://api2.codetap.academy/generate_portal_session", urlEncode({ customer_id: user.customer_id }))
    //     .then((response) => response.data);
    // });
  }

  const handleSubscribe = (value, plan_id) => {
    cbInstance.openCheckout({
      hostedPage: () => axios
        .post(`https://api2.codetap.academy/generate_checkout_new_url`, urlEncode({
          plan_id: `${plan_id}_${value}`,
          customer: JSON.stringify(customer),
        }))
        .then(({ data }) => {
          // console.log(data)
          return data
        }),
      success: hostedPageId => {
        // console.log(`hostedPageId`, hostedPageId)
      },
      close: () => {
        // console.log(`Checkout closed`)
      },
      step: step => {
        // console.log(`step`, step)
      }
    })
  }

  const handleSelectSubscribe = index => {
    updateSubscribeList(
      subscribeList.map((s, k) => k === index ? ({ ...s, selected: true }) : ({ ...s, selected: false }))
    )
  }

  const onSliderChange = (e, index) => {
    const { value } = e.target
    updateSubscribeList(
      subscribeList.map((s, k) => k === index ? ({ ...s, value }) : s)
    )
  }

  return (
    <div>
      <h1>Subscribe</h1>
      <h2>You get to choose how much you pay, literally!</h2>
      <StyledSubscribeList>
        {subscribeList.map(({ title, selected, value, disabled, range: { min, max, step }, featureList, plan_id }, index) => {
          if (accepted && plan_id === 'mentored') {
            disabled = false
          }
          return (
            <StyledSubscribeItem key={index} selected={selected}>
              <StyledSubscribeTitle>{title}</StyledSubscribeTitle>
              <StyledSubscribePrice>{value > 0 ? `£${value}` : 'FREE'}</StyledSubscribePrice>
              <StyledSubscribeRangeWrapper>
                <input
                  type="range"
                  value={value}
                  min={min}
                  max={max}
                  disabled={disabled}
                  step={step}
                  onChange={e => onSliderChange(e, index)}
                  onClick={() => handleSelectSubscribe(index)}
                />
              </StyledSubscribeRangeWrapper>
              <ul>
                {featureList.map((feature, k) => <li key={k}>{feature}</li>)}
              </ul>
              <StyledSubscribeButton
                onClick={() => handleSubscribe(value, plan_id)}
                disabled={disabled}
              >
                {value > 0 ? `Pay £${value} & Join` : 'Join for FREE'}
              </StyledSubscribeButton>
            </StyledSubscribeItem>
          )
        })}
      </StyledSubscribeList>
      {user && user.customer_id && <>
        <h2>Manage your subscription</h2>
        <p>You can update or cancel your subscription. To start, press the Manage Subscription button</p>
        <StyledSubscribeButton bgcolor="#ebad1a"
          onClick={handlePortal}
        >Manage your Subscription</StyledSubscribeButton>
      </>}
    </div>
  )
}

export default Subscribe
