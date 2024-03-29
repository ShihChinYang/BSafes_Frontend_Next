import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container'

import LoadStripe from '../../components/loadStripe';
import ContentPageLayout from '../../components/layouts/contentPageLayout';

import { paymentCompletedThunk } from '../../reduxStore/accountSlice';

export default function PaymentCompletion() {
    const dispatch = useDispatch();

    const [stripePromise, setStripePromise] = useState(null);
    const [messageBody, setMessageBody] = useState('');

    useEffect(() => {
        if (!stripePromise) return;

        stripePromise.then(async (stripe) => {
            const url = new URL(window.location);
            const clientSecret = url.searchParams.get('payment_intent_client_secret');
            const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
            dispatch(paymentCompletedThunk());
            setMessageBody(error ? `> ${error.message}` : (
                <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
            ));
        });
    }, [stripePromise]);

    return (
        <ContentPageLayout>
            <Container>
                <h1>Thank you!</h1>

                <div id="messages" role="alert" style={messageBody ? { display: 'block' } : {}}>{messageBody}</div>
            </Container>
            <LoadStripe setStripePromise={setStripePromise} />
        </ContentPageLayout>
    )
}

