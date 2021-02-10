import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
//import Typography from '@material-ui/core/Typography';
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
export default function PaymentDialog(props) {
    const [open, setOpen] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
        if (props.open) {
            setOpen(true);
            window
                .fetch("/payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ amount: 350 })
                })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setClientSecret(data.clientSecret);
                })
        }
    }, [props.open])
    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };
    const handleClose = () => {
        setOpen(false);
        props.close();
    };
    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };
    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            setOpen(false);
            props.close(true);
        }
    };
    return (
        <div>
            <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="payment-dialog" open={open}>
                <MuiDialogTitle>Pay <b>Rs 350</b> for <b>{props.title}</b> </MuiDialogTitle>
                <MuiDialogContent dividers style={{ margin: 30 }}>
                    <form id="payment-form" className="payment-form" onSubmit={handleSubmit}>
                        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                        <button
                            className="payment-button"
                            disabled={processing || disabled || succeeded}
                            id="submit"
                        >
                            <span id="button-text">
                                {processing ? (
                                    <div className="spinner" id="spinner"></div>
                                ) : (
                                        "Pay"
                                    )}
                            </span>
                        </button>
                        {/* Show any error that happens when processing the payment */}
                        {error && (
                            <div className="card-error" role="alert">
                                {error}
                            </div>
                        )}
                        {/* Show a success message upon completion */}
                        <p className={succeeded ? "result-message" : "result-message hidden"}>
                            Payment succeeded
                        </p>
                    </form>
                </MuiDialogContent>
            </Dialog>
        </div>
    );
}