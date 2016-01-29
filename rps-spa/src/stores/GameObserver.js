import Match from 'rps-core/src/Match'
import {EventEmitter} from 'events'

class GameObserver extends EventEmitter {

	/**
	 * @return {string}
	 */
	static get GAME_STARTED() {
		return 'GAME_STARTED'
	}

	/**
	 * @return {string}
	 */
	static get GAME_COMPLETED() {
		return 'GAME_COMPLETED'
	}

	/**
	 * @return {string}
	 */
	static get GAME_ROUND_STARTED() {
		return 'GAME_ROUND_STARTED'
	}

	/**
	 * @return {string}
	 */
	static get GAME_ROUND_RESULT() {
		return 'GAME_ROUND_RESULT'
	}

	/**
	 * @return {string}
	 */
	static get GAME_ROUND_COMPLETED() {
		return 'GAME_ROUND_COMPLETED'
	}

	/**
	 *
	 * @param gameModel {GameModel}
	 */
	constructor(gameModel) {
		super();

		/**
		 *
		 * @type {Match}
		 */
		var match = gameModel.match;

		/**
		 * Sugar
		 */
		this.getRounds = ()=> {
			return gameModel.rounds
		};
		this.getSymbols = ()=> {
			return gameModel.symbols
		};
		this.hasStarted = ()=> {
			return gameModel.isMatchPlaying
		};
		this.hasCompleted = ()=> {
			return gameModel.isMatchOver
		};
		this.hasRoundStarted = ()=> {
			return !!match.currentRound
		};
		this.getScore = ()=> {
			return gameModel.score
		};
		this.getResult = ()=> {
			return gameModel.result
		};
		this.getName = ()=> {
			return gameModel.name
		};

		var finishRoundTimeout, finishMatchTimeout, matchOver = false;

		function onMatchStart() {
			this.emitStarted();
		}

		function onMatchOver() {
			matchOver = true;
		}

		function onMatchNewRound() {
			this.emitRoundStarted();
		}

		function onMatchRoundOver() {
			this.emitRoundResult(gameModel.lastRoundResult);
			finishRoundTimeout = setTimeout(finishRound.bind(this), 1000);

		}

		function finishRound() {
			finishRoundTimeout = null;
			if (matchOver) {
				finishMatchTimeout = setTimeout(finishMatch.bind(this), 1000);
			}
			this.emitRoundCompleted(matchOver);
		}

		function finishMatch() {
			finishMatchTimeout = null;
			this.emitCompleted();
		}

		match.once(Match.START, onMatchStart.bind(this));
		match.on(Match.NEW_ROUND, onMatchNewRound.bind(this));
		match.on(Match.ROUND_OVER, onMatchRoundOver.bind(this));
		match.once(Match.OVER, onMatchOver.bind(this));
	}

	onStarted(callback) {
		this.on(GameObserver.GAME_STARTED, callback);
	}

	onCompleted(callback) {
		this.on(GameObserver.GAME_COMPLETED, callback);
	}

	onRoundStarted(callback) {
		this.on(GameObserver.GAME_ROUND_STARTED, callback);
	}

	onRoundResult(callback) {
		this.on(GameObserver.GAME_ROUND_RESULT, callback);
	}

	onRoundCompleted(callback) {
		this.on(GameObserver.GAME_ROUND_COMPLETED, callback);
	}

	offStarted(callback) {
		this.removeListener(GameObserver.GAME_STARTED, callback);
	}

	offCompleted(callback) {
		this.removeListener(GameObserver.GAME_COMPLETED, callback);
	}

	offRoundStarted(callback) {
		this.removeListener(GameObserver.GAME_ROUND_STARTED, callback);
	}

	offRoundResult(callback) {
		this.removeListener(GameObserver.GAME_ROUND_RESULT, callback);
	}

	offRoundCompleted(callback) {
		this.removeListener(GameObserver.GAME_ROUND_COMPLETED, callback);
	}

	emitStarted() {
		this.emit(GameObserver.GAME_STARTED);
	}

	emitCompleted() {
		this.emit(GameObserver.GAME_COMPLETED);
	}

	emitRoundStarted() {
		this.emit(GameObserver.GAME_ROUND_STARTED);
	}

	emitRoundResult(result) {
		this.emit(GameObserver.GAME_ROUND_RESULT, result);
	}

	emitRoundCompleted(isLast) {
		this.emit(GameObserver.GAME_ROUND_COMPLETED, isLast);
	}

}


export default GameObserver;