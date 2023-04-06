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
	transitions = {
		stopped: {
			drive: (distance) => {
				if (this.gas > 0) {
					console.log("Can't drive - car not started!");
					this.state = "running";
					report(0, this.gas, 0, this.state);
				} else {
					console.log("Can't start - tank empty");
				}
			},
		},
		running: {
			drive: (distance) => {
				//gas = 10
				//mpg = 10
				//max distance = 100

				//desired distance = 5
				//gas to use = desired / mpg = .5
				//drivable distance = gas * mpg

				const gasToUse = distance / this.mpg;
				if (this.gas > gasToUse) {
					this.state = "running";
					this.gas -= gasToUse;
					report(distance, gasToUse, this.gas, this.state);
				} else {
					this.state = "empty";
					const gasLeft = this.gas;
					const drivableDistance = this.gas * this.mpg;
					this.gas -= gasLeft;
					report(drivableDistance, this.gas, gasLeft, this.state);
				}
			},
		},
		empty: {
			drive: (distance) => {
				console.error("Can't drive - tank is empty!");
			},
		},
	};
	drive(distance) {
		this.transitions[this.state].drive(distance);
	}
}
