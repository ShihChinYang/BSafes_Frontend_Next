import { useState } from 'react'

import {
    PaymentElement,
    LinkAuthenticationElement
} from '@stripe/react-stripe-js'

import { useStripe, useElements } from '@stripe/react-stripe-js';

// variant="twin": Twin Paper button/message markup (styles in account.css).
export default function CheckoutForm({ variant = null, submitLabel = "Submit" }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/services/paymentCompletion`,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            { false && <LinkAuthenticationElement  id="link-authentication-element"
            // Access the email value like so:
            // onChange={(event) => {
            //  setEmail(event.value.email);
            // }}
            //
            // Prefill the email field like so:
            // options={{defaultValues: {email: 'foo@bar.com'}}}
            />}
            {variant === 'twin' ?
                <PaymentElement
                    id="payment-element"
                    onReady={() => setLoadError(null)}
                    onLoadError={(e) => setLoadError((e && e.error && e.error.message) || 'The payment form could not load.')}
                />
                :
                <PaymentElement id="payment-element" />
            }
            {variant === 'twin' ? <>
                {loadError && <p className="tw-field-error" role="alert">Payment form error: {loadError}</p>}
                {message && <p className="tw-field-error" role="alert">{message}</p>}
                <button type="submit" className="btn tw-checkout-submit" disabled={isLoading || !stripe || !elements}>
                    {isLoading ? 'Processing…' : submitLabel}
                </button>
            </> : <>
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Submit"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
            </>}
        </form>
    )

}