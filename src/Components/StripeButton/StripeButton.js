import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51HFgyqAJTEZ7zpCBUvPX7wiJQbFZnMBBp0ciY0mzrKbhOCuhill9l1tce5FH9Uga9etV7DKYX1uciVLAqHFndnxd00AOvrYwDP'
    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }
    
    return (
        <StripeCheckout
            label='COMPLETE ORDER'
            name='FutureX FRONTEND TASK'
            billingAddress
            shippingAddress
            image='https://www.graphicsprings.com/filestorage/stencils/1cf0e62090ebd950855b702c81587979.png?width=500&height=500'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeButton
