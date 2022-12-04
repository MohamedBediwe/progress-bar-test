/* eslint-disable */
import { PureComponent } from "react";
import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import ContentWrapper from "Component/ContentWrapper";
import Done from "./done.svg";
import "./Checkout.override.style.scss";

class Checkout extends SourceCheckout {
	renderProgressBar() {
		const { checkoutStep } = this.props;
		const DETAILS_STEP = "DETAILS_STEP";
		const steps = Object.keys(this.stepMap);
		const currentStepIndex = steps.findIndex((e) => e === checkoutStep);
		const progressBar = document.querySelector(".progress-bar");

		progressBar?.style.setProperty("--steps", `${steps.length - 1}`);
		progressBar?.style.setProperty("--current-step", `${currentStepIndex + 1}`);

		return (
			<div className="progress-bar">
				{steps
					.filter(
						(e) => e !== DETAILS_STEP || this.stepMap[e].url !== "/success"
					)
					.map((step, i) => (
						<div
							className={`step ${
								currentStepIndex > i || currentStepIndex === i ? "active" : ""
							}`}
						>
							<span>
								{currentStepIndex > i ? (
									<img src={Done} alt="complete" />
								) : (
									i + 1
								)}
							</span>
							<span className="text">{this.stepMap[step].title}</span>
						</div>
					))}
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
