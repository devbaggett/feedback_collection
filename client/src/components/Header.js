import React, { Component } from "react";
// IMPORT CONNECT HELPER FROM REACT-REDUX
import { connect } from "react-redux";
// IMPORT LINK TAG
import { Link } from "react-router-dom";
// IMPORT PAYMENTS
import Payments from "./Payments";

// CREATE CLASS-BASED COMPONENT
class Header extends Component {
	// HELPER METHOD FOR LOGIC DETERMINING WHAT'S INSIDE HEADER
	renderContent() {
		// INSPECT THIS.PROPS.AUTH PROPERTY (1/3 VALUES)
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			// USER MODEL (LOGGED IN)
			default:
				return [
					// SHOWS PAYMENT COMPONENT
					<li key="1">
						<Payments />
					</li>,
					<li key="2" style={{ margin: "0 10px" }}>
						Credits: {this.props.auth.credits}
					</li>,
					<li key="3">
						<a href="/api/logout">Logout</a>
					</li>
				];
		}
	}
	render() {
		// console.log(this.props);
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? "/surveys" : "/"}
						className="left brand-logo"
					>
						Emaily
					</Link>
					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

// GETS CALLED WITH ENTIRE STATE OBJECT OUT OF REDUX STORE
function mapStateToProps({ auth }) {
	// RETURN OBJECT (auth property) THAT WILL BE PASSED TO HEADER AS PROPS
	return { auth };
}

export default connect(mapStateToProps)(Header);
