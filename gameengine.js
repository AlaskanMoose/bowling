class GameEngine {
	constructor() {
		this.gameState = {
			currentFrameNumber: 0,
			totalScore: 0,
			frames: [],
		}

		for (let i = 0; i < 9; i++)
			this.gameState.frames[i] = new Frame();

		let frame10 = new Frame();
		frame10.frameState.rollsLeft = 3;
		this.gameState.frames.push(frame10);


		let me = this;
		for (let i = 0; i <= 10; i++) {
			document.getElementById(`${i}`).onclick = function () {
				me.score(i);
			}
		}
	}

	score(buttonRolled) {
		if (this.gameState.frames[this.gameState.currentFrameNumber].frameState.rollsLeft < 1)
			this.gameState.currentFrameNumber++;

		// if (this.gameState.currentFrameNumber > 9)
		// 	this.initialize();

		let frame = this.gameState.frames[this.gameState.currentFrameNumber];

		frame.bowled(buttonRolled);

		if (frame.frameState.isStrike) {
			document.getElementById(`frame${this.gameState.currentFrameNumber}`).innerHTML =
				`X`;
		} else if (frame.frameState.isSpare) {
			document.getElementById(`frame${this.gameState.currentFrameNumber}`).innerHTML =
				`${frame.frameState.rollOne} /`;
			this.enableButtons();
		} else {
			document.getElementById(`frame${this.gameState.currentFrameNumber}`).innerHTML =
				`${frame.frameState.rollOne} ${frame.frameState.rollTwo}`;
			this.disableButtons(frame.frameState.pinsLeft);
		}

		if (this.gameState.frames[this.gameState.currentFrameNumber].frameState.rollsLeft < 1)
			this.enableButtons();

		this.updateFrameScore();
	}

	disableButtons(numberOfPinsLeft) {
		for (let i = numberOfPinsLeft + 1; i <= 10; i++) document.getElementById(`${i}`).disabled = true;
	}
	enableButtons() {
		for (let i = 0; i <= 10; i++) document.getElementById(`${i}`).disabled = false;

	}

	updateFrameScore() {
		for (let i = 0; i < 8; i++) {
			let frame = this.gameState.frames[i];
			if (frame.frameState.isPlayed = true) {
				let firstRollAfter = 0;
				let secondRollAfter = 0;
				if (this.gameState.frames[i + 1].frameState.isPlayed == true &&
					this.gameState.frames[i + 2].frameState.isPlayed == false &&
					this.gameState.frames[i + 1].frameState.isStrike == true) {

					firstRollAfter = this.gameState.frames[i + 1].frameState.rollOne;

				} else if (this.gameState.frames[i + 1].frameState.isPlayed == true &&
					this.gameState.frames[i + 2].frameState.isPlayed == false &&
					this.gameState.frames[i + 1].frameState.isStrike == false) {

					firstRollAfter = this.gameState.frames[i + 1].frameState.rollOne;
					secondRollAfter = this.gameState.frames[i + 1].frameState.rollTwo;

				} else if (this.gameState.frames[i + 1].frameState.isPlayed == true &&
					this.gameState.frames[i + 2].frameState.isPlayed == true &&
					this.gameState.frames[i + 1].frameState.isStrike == true) {

					firstRollAfter = this.gameState.frames[i + 1].frameState.rollOne;
					secondRollAfter = this.gameState.frames[i + 2].frameState.rollOne;
				} else if (this.gameState.frames[i + 1].frameState.isPlayed == true &&
					this.gameState.frames[i + 2].frameState.isPlayed == true &&
					this.gameState.frames[i + 1].frameState.isStrike == false) {
					firstRollAfter = this.gameState.frames[i + 1].frameState.rollOne;
					secondRollAfter = this.gameState.frames[i + 1].frameState.rollTwo;
				}

				if (frame.frameState.isStrike)
					frame.frameState.score = (10 + firstRollAfter + secondRollAfter);

				if (frame.frameState.isSpare)
					frame.frameState.score = 10 + firstRollAfter;


			}
			this.gameState.totalScore += frame.frameState.score;

		}
		let frame9 = this.gameState.frames[8];
		if (this.gameState.frames[9].isPlayed) {
			if (frame9.frameState.isStrike)
				frame9.frameState.score = (10 + this.gameState.frames[9].rollOne +
					this.gameState.frames[9].rollTwo);

			if (frame9.frameState.isSpare)
				frame9.frameState.score = 10 + this.gameState.frames[9].rollOne;

			this.gameState.totalScore += frame9.frameState.score;
		}


		let frame10 = this.gameState.frames[9];
		if (frame10.frameState.isStrike)
			frame10.frameState.score = (10 + this.gameState.frames[9].rollOne +
				this.gameState.frames[9].rollTwo +
				this.gameState.frames[9].rollThree);

		if (frame10.frameState.isSpare)
			frame10.frameState.score = 10 + this.gameState.frames[9].rollOne;

		console.log(frame10.frameState);

		for (let i = 0; i < 10; i++) {
			document.getElementById(`frameScore${i}`).innerHTML =
				`${this.gameState.frames[i].frameState.score}`;
		}

	}

}