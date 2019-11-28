import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { urlEncode } from '../util';
import { WebInfoState } from '../web-info/web-info.context';
import subscribeConfig from './subscribe.config'
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { StyledSubscribeButton, StyledSubscribePanel, StyledSubscribeLabelWrapper, StyledSubscribeLabel, StyledSubscribeFeature, StyledSubscribeFeatureLabel, StyledSubscribeAmount, StyledSubscribeSliderInfo, StyledSubscribeButtonWrapper, StyledSubscribeUser } from './subscribe.style';
import Button from '../_dumb/button';
const SubscribeSlider = withStyles({
  root: {
    color: '#d52027',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const cbInstance = window.Chargebee.init({
  site: 'bitbeeuk'
})

const Subscribe = () => {
  const [selected, updateSelected] = useState(2)
  const [customer, updateCustomer] = useState(subscribeConfig)
  const { user } = WebInfoState();

  useEffect(() => {
    const [first_name, last_name] = ((user && user.displayName) || ' ').split(' ')
    const { email, uid } = user || {}

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
        // console.log('createChargebeePortal loaded')
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

  const handleSubscribe = () => {
    const plan_id = subscribeConfig.marks[selected].plan_id
    cbInstance.openCheckout({
      hostedPage: () => axios
        .post(`https://api2.codetap.academy/generate_checkout_new_url`, urlEncode({
          plan_id,
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

  const onSliderChange = (e, index) => {
    updateSelected(index)
  }

  return (
    <StyledSubscribePanel>
      <StyledSubscribeLabelWrapper>
        {subscribeConfig.marks.map(({ label }, index) => <StyledSubscribeLabel selected={index === selected}>{label}</StyledSubscribeLabel>)}
      </StyledSubscribeLabelWrapper>
      <StyledSubscribeAmount>£{subscribeConfig.marks[selected].amount} <StyledSubscribeSliderInfo>
        monthly
      </StyledSubscribeSliderInfo></StyledSubscribeAmount>
      <SubscribeSlider
        valueLabelDisplay="off"
        aria-label="Subscribe slider"
        defaultValue={2}
        max={5}
        onChange={onSliderChange}
      />
      <StyledSubscribeSliderInfo>Use the slider to select how quickly you want to become successful. The more you go to the right, the faster you progress and the shorter the time until you become successful. The record <strong>From Zero to Hired</strong>, in just 7 Weeks, is hold by two of our students: <StyledSubscribeUser>@QuintyHH#9308</StyledSubscribeUser> and <StyledSubscribeUser>
        @Razvan Puscasu#2356</StyledSubscribeUser>.</StyledSubscribeSliderInfo>

      <StyledSubscribeButtonWrapper>
        {(!user || user && !user.customer_id) &&
          <Button
            onClick={handleSubscribe}
            label="Subscribe Now"
            color="danger"
            icon="subscribe"
            disabled={!user}
          />
        }
        {user && user.customer_id &&
          <Button
            onClick={handlePortal}
            label="Manage Your Subscription"
            color="warning"
            icon="subscribe"
          />
        }
      </StyledSubscribeButtonWrapper>

      <StyledSubscribeSliderInfo>To be able to subscribe you want to authenticate. Click on the <strong>Login</strong> button located at the top right of this page. Use your GitHub account to authenticate. If you do not have a GitHub account, in the popup that opens, choose to <strong>Create an account</strong>.</StyledSubscribeSliderInfo>

      <StyledSubscribeLabelWrapper>
        {subscribeConfig.featureList.map(({ label, amount }) => <StyledSubscribeFeature selected={amount <= subscribeConfig.marks[selected].amount}>
          <StyledSubscribeFeatureLabel>
            {label}
          </StyledSubscribeFeatureLabel>
          <div className="codetap-academy-check"></div>
        </StyledSubscribeFeature>)}
      </StyledSubscribeLabelWrapper>

      <StyledSubscribeButtonWrapper>
        {user && !user.customer_id &&
          <Button
            onClick={handleSubscribe}
            label="Subscribe Now"
            color="danger"
            icon="subscribe"
          />
        }
        {user && user.customer_id &&
          <Button
            onClick={handlePortal}
            label="Manage Your Subscription"
            color="warning"
            icon="subscribe"
          />
        }
      </StyledSubscribeButtonWrapper>
    </StyledSubscribePanel>
  )
}

export default Subscribe
