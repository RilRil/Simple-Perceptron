const canvasW = 400;
const canvasH = 400;
let button = null;
let button2 = null;
let pFrameRate = null;

let trainingPoints = [];
let brain = null;
let letstrain = false;
let showPercentage = false;

function f(x) {
	return 2 * x + 50;
}

function setup() {

	brain = new Perceptron();
	createCanvas(canvasW, canvasH);

	button = createButton('Start training');
	button.mousePressed(onClickOnTrainButton);

	button2 = createButton('Show percentage');
	button2.mousePressed(onClickOnShowPercentButton);

	pFrameRate = createP('');

	for (let i = 0; i < 2000; i++) {
		trainingPoints.push(new Point(random(-(canvasW / 2), canvasW / 2), random(-(canvasH / 2), canvasH / 2), f));
	}

	show();
}

function show() {
	background(235);
	translate(canvasW / 2, canvasH / 2);

	fill(0);
	for (let i = 0; i < 500; i++) {
		let point = trainingPoints[i];
		let guess = brain.guess([point.x, point.y]);
		point.color = brain.getColor(guess);
		point.show();
	}

	stroke(3);
	strokeWeight(3);
	line(-(canvasW / 2), f(-(canvasW / 2)), canvasW / 2, f(canvasW / 2));

	displayGuessedLine();
	if (showPercentage) {
		displayPercentage();
	}
}

let tick = 0;
function draw() {
	if (tick === 10) {
		pFrameRate.html(nfc(frameRate(), 0));
		tick = 0;
	}

	if (letstrain) {
		brain.trainAll(trainingPoints);
		show();
	}
	tick++;
}

function displayGuessedLine() {
	let x1 = -(canvasW / 2);
	let y1 = (-brain.weights[2] - brain.weights[0] * x1) / brain.weights[1];
	let x2 = canvasW / 2;
	let y2 = (-brain.weights[2] - brain.weights[0] * x2) / brain.weights[1];
	stroke(100);
	strokeWeight(2);
	line(x1, y1, x2, y2);
}

function onClickOnTrainButton() {
	letstrain = !letstrain;
	button.html((letstrain ? 'Stop' : 'Start') + ' training');
}
function onClickOnShowPercentButton() {
	showPercentage = !showPercentage;
	button2.html((showPercentage ? 'Hide' : 'Show') + ' percentage');
}

function keyTyped() {
	if (key === 't') {
		onClickOnTrainButton();
	}
	if (key === 'p') {
		onClickOnShowPercentButton();
	}
}

function displayPercentage() {
	let good = 0;
	let iterations = 1000;
	for (let i = 0; i < iterations; i++) {
		let pt = trainingPoints[i];
		let guess = brain.guess([pt.x, pt.y]);
		if (guess === pt.class) {
			good++
		}
	}
	let percentage = good / iterations * 100;
	let xP = -(canvasW / 2) + 5;
	let yP = canvasH / 2 - 55;

	fill(255);
	rect(xP, yP, 150, 50);
	fill(0);
	stroke(0);
	strokeWeight(2);
	textSize(32);
	text(nfc(percentage, 2) + '%', xP + 5, yP + 35);
}
