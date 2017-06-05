class Perceptron {
	constructor() {
		this.weights = [];
		this.learningRate = 0.5;

		for (let i = 0; i < 2; i++) {
			this.weights[i] = random(-1, 1);
		}
	}

	train(points) {
		let self = this;
		points.forEach(function(point) {
			let guess = self.guess([point.x, point.y]);
			point.color = self.getColor(guess);
			let error = point.class - guess;
			if(error !==  0) {
				self.weights[0] += error * point.x * self.learningRate;
				self.weights[1] += error * point.y * self.learningRate;
			}
		});
		console.log('cyril -- weights are ', this.weights);
	}

	guess(inputs) {
		let sum = 0;
		let self = this;
		inputs.forEach(function(input, idx) {
			sum += input * self.weights[idx];
		});
		return self.sign(sum);
	}

	sign(n) {
		return n >= 0 ? 1 : -1;
	}

	getColor(n) {
		return n === 1 ? color(200, 0, 0) : color(0, 125, 250);
	}

}
