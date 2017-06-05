const canvasW = 500;
const canvasH = 500;

let trainingPoints = [];
let brain = null;

let w0 = 0;
let w1 = 0;

function f(x) {
	return x;
}

function setup() {
	createCanvas(canvasW, canvasH);

	brain = new Perceptron();
	w0 = brain.weights[0];
	w1 = brain.weights[1];
	console.log('cyril -- weights are ', w0, w1);

	for (let i = 0; i < 10000; i++) {
		trainingPoints.push(new Point(random(canvasW), random(canvasH), f));
	}

	show();

	displayPercentage();

}

function draw() {

}

function show() {
	background(235);
	fill(0);
	trainingPoints.forEach(function(point) {
		// let guess = brain.guess([point.x, point.y]);
		// point.color = brain.getColor(guess);
		point.show();
	});

	stroke(3);
	strokeWeight(3);
	for (let x = 0; x < canvasW; x++) {
		point(x, f(x));
	}
}

function keyTyped() {
	if (key === ' ') {
		brain.train(trainingPoints);
		if (brain.weights[0] === w0 && brain.weights[1] === w1) {
			console.log('cyril -- Yeah ');
		} else {
			w0 = brain.weights[0];
			w1 = brain.weights[1];
		}
		show();
		displayPercentage();
	}
	if (key === 's') {
		for (let i = 0; i < 30; i++) {
			console.log('cyril -- Training ', i);
			brain.train(trainingPoints);
			if (brain.weights[0] === w0 && brain.weights[1] === w1) {
				console.log('cyril -- Yeah ');
				break;
			} else {
				w0 = brain.weights[0];
				w1 = brain.weights[1];
			}
			show();
		}
		// displayPercentage();
	}

}

function displayPercentage() {
	let good = 0;
	let iterations = 1000;
	for (let i = 0; i < iterations; i++) {
		let pt = new Point(random(canvasW), random(canvasH), f);
		let guess = brain.guess([pt.x, pt.y]);
		if (guess === pt.class) {
			good++
		}
	}
	let percentage = good / iterations * 100;
	fill(255);
	rect(10, 15, 150, 50);
	fill(0);
	stroke(0);
	strokeWeight(2);
	textSize(32);
	text(nfc(percentage, 2) + '%', 20, 50);
}
