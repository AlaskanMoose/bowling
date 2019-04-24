class Frame {
	constructor() {
		this.frameState = {
			score: 0,
			pinsLeft: 10,
			isStrike: false,
			isSpare: false,
			isPlayed: false,
			rollsLeft: 2,
			rollOne: '',
			rollTwo: '',
			display: ''
		}

		this.strike = 'X';
		this.spare = '/';
	}

	bowled(numberOfPinsKnockedDown) {
		this.frameState.rollsLeft--;
		this.frameState.pinsLeft -= numberOfPinsKnockedDown;
		this.frameState.score += numberOfPinsKnockedDown;

		if (this.frameState.rollsLeft == 1) {
			if (this.frameState.pinsLeft == 0) {
				this.frameState.isStrike = true;
				this.frameState.rollsLeft--;
				this.frameState.isPlayed = true;
			}
			this.frameState.rollOne = numberOfPinsKnockedDown;
		} else {
			if (this.frameState.pinsLeft == 0) this.frameState.isSpare = true;
			this.frameState.rollTwo = numberOfPinsKnockedDown;
			this.frameState.isPlayed = true;
		}

	}

	updateScore() {

	}
}