enum States {
	stopped = "stopped",
	running = "running",
}
type Brand<K, T> = K & { __type: T };
export type MPG = Brand<number, "MPG">;
export type Gallons = Brand<number, "Gas">;

export const report = (
	distance: number,
	gas: number,
	used: number,
	state: States
) => {
	console.log(
		`Distance: ${Math.round(distance)} | Gas Used: ${Math.round(
			used
		)} | Gas Left: ${Math.round(gas)} | Final State: ${state}`
	);
};

export class NewCar {
	state: States;
	gas: Gallons;
	mpg: MPG;
	constructor(gas: Gallons, mpg: MPG) {
		this.gas = gas;
		this.mpg = mpg;
		this.state = States.stopped;
	}
	start = () => {
		console.log("Starting car!");
		if (this.gas > 0) {
			this.state = States.running;
		} else {
			console.log("No gas!");
		}
	};
	fill = (gallon: Gallons) => {
		this.gas = (this.gas + gallon) as Gallons;
	};
	transitions: Record<States, { drive: (distance: number) => void }> = {
		[States.stopped]: {
			drive: (distance: number) => {
				console.log("Can't drive - car not started!");
			},
		},
		[States.running]: {
			drive: (distance: number) => {
				const gasToUse = distance / this.mpg;
				if (this.gas > gasToUse) {
					this.state = States.running;
					this.gas = (this.gas - gasToUse) as Gallons;
					report(distance, this.gas, gasToUse, this.state);
				} else {
					this.state = States.stopped;
					const gasLeft = this.gas;
					const drivableDistance = this.gas * this.mpg;
					this.gas = (this.gas - gasLeft) as Gallons;
					console.log("Car turned off!");
					report(drivableDistance, this.gas, gasLeft, this.state);
				}
			},
		},
	};
	drive(distance: number) {
		this.transitions[this.state].drive(distance);
	}
}
