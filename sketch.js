const canvasW = 400;
const canvasH = 400;

let trainingPoints = [];
let brain = null;

let w0 = 0;
let w1 = 0;

function f(x) {
	return 0.5 * x + 100;
}

function setup() {
	createCanvas(canvasW, canvasH);

	brain = new Perceptron();
	w0 = brain.weights[0];
	w1 = brain.weights[1];
	console.log('cyril -- weights are ', w0, w1);

	for (let i = 0; i < 5000; i++) {
		trainingPoints.push(new Point(random(10, canvasW-10), random(10, canvasH-10), f));
	}

	show();
	displayPercentage();
}

function show() {
	background(235);
	fill(0);
	trainingPoints.forEach(function(point) {
		let guess = brain.guess([point.x, point.y]);
		point.color = brain.getColor(guess);
		point.show();
	});

	stroke(3);
	strokeWeight(3);
	line(0, f(0), canvasW, f(canvasW));
}

var letstrain = false;
function draw() {
	if (letstrain) {
		brain.trainAll(trainingPoints);
		let x1 = 0;
		let y1 = (-brain.weights[2] - brain.weights[0]*x1)/brain.weights[1];
		let x2 = canvasW;
		let y2 = (-brain.weights[2] - brain.weights[0]*x2)/brain.weights[1];
		show();
		stroke(100);
		strokeWeight(2);
		line(x1, y1, x2, y2);
	}

}

function keyTyped() {
	if (key === 'c') {
		letstrain = !letstrain;
	}
	if (key === ' ') {
		brain.trainAll(trainingPoints);
		if (brain.weights[0] === w0 && brain.weights[1] === w1) {
			console.log('cyril -- Yeah ');
		} else {
			w0 = brain.weights[0];
			w1 = brain.weights[1];
		}
		show();
		displayPercentage();
	}
	if (key === 'ssads') {
		for (let i = 0; i < 100; i++) {
			console.log('cyril -- Training ', i);
			brain.trainAll(trainingPoints);
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
	let iterations = 10000;
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
