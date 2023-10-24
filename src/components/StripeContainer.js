import React, { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm"
import { Container } from "react-bootstrap"
import axios from 'axios';

// const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY
const PUBLIC_KEY = "pk_test_51NsJnhSJ1iUOrfrGXbgTfNuup8VugVN6nshp4ZUjWljeAL6FkBSjUHk6ra5GM01t8rVbPfRiKAS6E6Ynr5YENTPx00nCWPyoH5"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

function StripeContainer({ name, address, email, totalPrice }) {
    console.log(parseInt(totalPrice))
    const [clientSecret, setClientSecret] = useState("")




    useEffect(() => {
        // Make a POST request with data
      
        axios.post('http://localhost:3001/api/v1/orders', {
            "data":{
                "customer_id":12,
                "credit_card_number":"5555555555554444",
                "credit_card_exp_month":"08",
                "credit_card_exp_year":"2028",
                "credit_card_cvv":"345"
            }
        })
            .then(response => {
                // Handle successful response here
                console.log(response.data);
                setClientSecret(response.data.clientSecret)
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error);
            });
        // debugger
        //  fetch("https://localhost:3001/api/v1/orders", {
        // 	method: "POST",
        // 	headers: { "Content-Type": "application/json" },
        // 	body: JSON.stringify({
        // 		customer_id:12,
        //         credit_card_number:"5555555555554444",
        //          credit_card_exp_month:"08",
        //          credit_card_exp_year:"2028",
        //         credit_card_cvv:"345"
        // 	}),
        // })
        // 	.then((res) => console.log(res , "resssssssss"))
        // 	.then((data) => setClientSecret(data.clientSecret))
    }, [])


    const appearance = {
        theme: "stripe",
    }
    const options = {
        clientSecret,
        appearance,
    }
    return (
        <Container style={{ marginTop: "75px" }}>
            <div className="App">
                {clientSecret && (
                    <Elements options={options} stripe={stripeTestPromise}>
                        <PaymentForm />
                    </Elements>
                )}
            </div>
        </Container>
    )
}

export default StripeContainer