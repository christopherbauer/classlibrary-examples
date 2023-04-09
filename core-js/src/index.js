export const report = (distance, gas, used, state) => {
	console.log(
		`Distance: ${Math.round(distance)} | Gas Used: ${Math.round(
			used
		)} | Gas Left: ${Math.round(gas)} | Final State: ${state}`
	);
};
export class NewCar {
	constructor(gas, mpg) {
		this.gas = gas;
		this.mpg = mpg;
		this.state = "stopped";
	}
	start = () => {
		console.log("Starting car!");
		if (this.gas > 0) {
			this.state = "running";
		} else {
			console.log("No gas!");
		}
	};
	fill = (gallon) => {
		this.gas += gallon;
	};
	transitions = {
		stopped: {
			drive: (distance) => {
				console.log("Can't drive - car not started!");
			},
		},
		running: {
			drive: (distance) => {
				const gasToUse = distance / this.mpg;
				if (this.gas > gasToUse) {
					this.state = "running";
					this.gas -= gasToUse;
					report(distance, this.gas, gasToUse, this.state);
				} else {
					this.state = "stopped";
					const gasLeft = this.gas;
					const drivableDistance = this.gas * this.mpg;
					this.gas -= gasLeft;
					console.log("Car turned off!");
					report(drivableDistance, this.gas, gasLeft, this.state);
				}
			},
		},
	};
	drive(distance) {
		this.transitions[this.state].drive(distance);
	}
}
