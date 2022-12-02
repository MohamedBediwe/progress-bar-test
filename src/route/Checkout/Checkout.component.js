/* eslint-disable */
import { PureComponent } from "react";
import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import ContentWrapper from "Component/ContentWrapper";
import Done from "./done.svg";

class Checkout extends SourceCheckout {
	// divide the bar into 3 segments
	// fill the first part of the bar
	// if the first process is complete fill the second part
	// if the second part is complete fill the third part

	renderProgressBar() {
		const SHIPPING_STEP = "SHIPPING_STEP";
		const BILLING_STEP = "BILLING_STEP";
		const DETAILS_STEP = "DETAILS_STEP";
		const { checkoutStep } = this.props;

		const progressBar = document.querySelector(".progress-bar");

		if (checkoutStep === SHIPPING_STEP) {
			progressBar.style.setProperty("progress", "40%");
		} else if (checkoutStep === BILLING_STEP) {
			progressBar.style.setProperty("progress", "60%");
		} else {
			progressBar.style.setProperty("progress", "100%");
		}

		return (
			<div className="progress-bar">
				{checkoutStep === SHIPPING_STEP && (
					<>
						<div className="step shipping active">
							<span>1</span>
							<span className="text">shipping</span>
						</div>
						<div className="step payment">
							<span>2</span>
							<span className="text">review & Payment</span>
						</div>
					</>
				)}
				{checkoutStep === BILLING_STEP && (
					<>
						<div className="step shipping active">
							<span>
								<img src={Done} alt="complete" />
							</span>
							<span className="text">shipping</span>
						</div>
						<div className="step payment active">
							<span>2</span>
							<span className="text">review & Payment</span>
						</div>
					</>
				)}
				{checkoutStep === DETAILS_STEP && (
					<>
						<div className="step shipping active">
							<span>
								<img src={Done} alt="complete" />
							</span>
							<span className="text">shipping</span>
						</div>
						<div className="step payment active">
							<span>
								<img src={Done} alt="complete" />
							</span>
							<span className="text">review & Payment</span>
						</div>
					</>
				)}
			</div>
		);
	}

	render() {
		return (
			<main block="Checkout">
				<section aria-label="Progress bar">{this.renderProgressBar()}</section>
				<ContentWrapper
					wrapperMix={{ block: "Checkout", elem: "Wrapper" }}
					label={__("Checkout page")}
				>
					{this.renderSummary(true)}
					<div block="Checkout" elem="Step">
						{this.renderTitle()}
						{this.renderGuestForm()}
						{this.renderStep()}
						{this.renderLoader()}
					</div>
					<div>
						{this.renderSummary()}
						{this.renderPromo()}
						{this.renderCoupon()}
					</div>
				</ContentWrapper>
			</main>
		);
	}
}

export default Checkout;
