class GameResult {
	/**
	 * @return {string}
	 */
	static get UNDETERMINED() {
		return 'GameResult.UNDETERMINED';
	}

	/**
	 * @return {string}
	 */
	static get PLAYERS_DRAW() {
		return 'GameResult.PLAYERS_DRAW';
	}

	/**
	 * @return {string}
	 */
	static get PLAYER1_WINS() {
		return 'GameResult.PLAYER1_WINS';
	}

	/**
	 * @return {string}
	 */
	static get PLAYER2_WINS() {
		return 'GameResult.PLAYER2_WINS';
	}
}

export default GameResult;