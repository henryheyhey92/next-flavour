import { useContext } from "react";
import UsersContext from '../../contexts/UsersContext';
// import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

export default async function Checkout() {
  const context = useContext(UsersContext);
  //   console.log("checkout", stripeSessionInfo);
  let sessionIdObj = { sessionId: context.getStripKey().sessionId };
  let publishableKey = context.getStripKey().publishableKey;
  const stripePromise = loadStripe(publishableKey);
  const stripe = await stripePromise;
  stripe.redirectToCheckout(sessionIdObj);
}