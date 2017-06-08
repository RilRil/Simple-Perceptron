class Perceptron {
	constructor() {
		this.weights = [0, 0, 0];
		this.learningRate = 0.01;

		for (let i = 0; i < this.weights.length; i++) {
			this.weights[i] = random(-1, 1);
		}
	}

	train(point) {
		let guess = this.guess([point.x, point.y]);
		point.color = this.getColor(guess);
		let error = point.class - guess; // can be 0, -2 or +2
		if (error !== 0) {
			this.weights[0] += error * point.x * this.learningRate;
			this.weights[1] += error * point.y * this.learningRate;
			this.weights[2] += error * this.learningRate;
		}
	}

	trainAll(points) {
		let self = this;
		points.forEach(function(point) {
			let guess = self.guess([point.x, point.y]);
			point.color = self.getColor(guess);
			let error = point.class - guess; // can be 0, -2 or +2
			if (error !== 0) {
				self.weights[0] += error * point.x * self.learningRate;
				self.weights[1] += error * point.y * self.learningRate;
				self.weights[2] += error * self.learningRate;
			}
		});
	}

	guess(inputs) {
		let sum = 0;
		let self = this;
		inputs.forEach(function(input, idx) {
			sum += input * self.weights[idx];
		});
		sum += self.weights[2];
		return self.sign(sum);
	}

	squash(n) {
		return 1 / (1 + Math.exp(-n));
	}

	sign(n) {
		return n >= 0 ? 1 : -1;
	}

	getColor(n) {
		return n === -1 ? color(200, 0, 0) : color(0, 125, 250);
	}

}
