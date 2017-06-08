class Point {
	constructor(x, y, f) {
		this.x = x;
		this.y = y;
		this.color = color(255, 255, 255);

		let yLine = f(this.x);

		this.class = this.y <= yLine ? -1 : 1;

	}

	show() {
		noStroke();
		fill(this.color);
		ellipse(this.x, this.y, 3, 3);
	}
}
