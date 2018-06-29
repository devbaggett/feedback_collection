// MAKE CLASS-BASED COMPONENT
import React, { Component } from "react";
// IMPORT STRIPE CHECKOUT
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
	render() {
		// amount of money we want to request from user
		// tell Stripe what currency/denomination (default: US Dollars)
		// amount in CENTS ($5 = 500 cents)
		// token is expecting to receive callback function
		// called after we have successfully retrieved auth token from Stripe API
		// stripeKey is publishable key from .env files
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				amount={500}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">Add Credits</button>
			</StripeCheckout>
		);
	}
}

// WIRE UP CONNECT HELPER
export default connect(
	null,
	actions
)(Payments);
