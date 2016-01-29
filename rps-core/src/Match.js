import _ from 'lodash';
import Round from './Round';
import GameResult from './games/GameResult';
import DuelGame from './games/DuelGame';
import Notifier from './Notifier';

const ACCEPTABLE_RESULTS = [
	GameResult.PLAYER1_WINS,
	GameResult.PLAYER2_WINS,
	GameResult.PLAYERS_DRAW
];

function isAcceptableResult(result) {
	return _.includes(ACCEPTABLE_RESULTS, result);
}

class Match extends Notifier {
	/**
	 * @return {string}
	 */
	static get START() {
		return "Match.START";
	}

	/**
	 * @return {string}
	 */
	static get OVER() {
		return "Match.OVER";
	}

	/**
	 * @return {string}
	 */
	static get NEW_ROUND() {
		return "Match.NEW_ROUND";
	}

	/**
	 * @return {string}
	 */
	static get ROUND_OVER() {
		return "Match.ROUND_OVER";
	}

	/**
	 * @return {string}
	 */
	static get PLAYER_1() {
		return "Match.PLAYER_1";
	}

	/**
	 * @return {string}
	 */
	static get PLAYER_2() {
		return "Match.PLAYER_2";
	}

	/**
	 * @return {string}
	 */
	static get DRAW() {
		return "Match.DRAW";
	}

	/**
	 *
	 * @param game
	 * @param roundNumber
	 * @param autoplay
	 */
	constructor(game, roundNumber = 1, autoplay = true) {
		if (!game) {
			//if(!game || !(game instanceof DuelGame)){
			throw new Error('[Match] constructor: parameter "game" is not valid.');
		}
		super();
		this._game = game;
		this._maxRound = roundNumber;
		this._autoplay = autoplay;
		this._started = false;
		this._completed = false;

		/**
		 *
		 * @type {Round}
		 * @private
		 */
		this._currentRound = undefined;
		/**
		 *
		 * @type {Round[]}
		 * @private
		 */
		this._playedRounds = undefined;
	}

	get game() {
		return this._game;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	get isPlaying() {
		return this._started && !this._completed;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	get isOver() {
		return this._started && this._completed;
	}

	/**
	 *
	 * @returns {Round}
	 */
	get currentRound() {
		return this._currentRound || null;
	}

	/**
	 *
	 * @returns {Round}
	 */
	get lastRound() {
		return _.last(this._playedRounds) || null;
	}

	/**
	 *
	 * @returns {Round[]}
	 */
	get rounds() {
		return !!this._playedRounds && this._playedRounds.slice();
	}

	/**
	 *
	 * @returns {Number}
	 */
	get maxRound() {
		return this._maxRound;
	}

	/**
	 *
	 * @returns {{player1: {Number}, player2: {Number}}}
	 */
	get score() {
		let rounds = this.rounds;
		function countResultType(type) {
			return _.filter(rounds, (round)=> {
				return round.isResolved && round.result === type;
			}).length;
		}

		return {
			player1: countResultType(GameResult.PLAYER1_WINS),
			player2: countResultType(GameResult.PLAYER2_WINS)
		};
	}

	/**
	 *
	 * @returns {Match.DRAW|Match.PLAYER_1|Match.PLAYER_2}
	 */
	get winner() {
		if (this.isPlaying || this.isOver) {
			var score = this.score;
			return (score.player1 === score.player2) ? Match.DRAW
				: (score.player1 < score.player2) ? Match.PLAYER_2
				: Match.PLAYER_1;
		}
		return Match.DRAW;
	}

	/**
	 *
	 * @returns {{score: {player1: {Number}, player2: {Number}}, winner: (Match.DRAW|Match.PLAYER_1|Match.PLAYER_2)}}
	 */
	get result() {
		return {
			score: this.score,
			winner: this.winner
		}
	}

	start() {
		this._started = true;
		this._playedRounds = [];
		this._notifyMatchStart();
		this._startNextRound();
	}

	next() {
		if(!this._autoplay){
			this._startNextRound();
		}
	}

	stop() {
		if (this.isOver) return;

		if (this.isPlaying) {
			var currentRoundPlaying = !!this.currentRound &&
				(this.currentRound.isPending || !this.currentRound.isResolved);
			if (currentRoundPlaying) {
				console.warn('[Match] - stop() :: Match is interrupted, not keeping the current round.');
			}

			this._completed = true;
			this._notifyMatchOver();
		}
	}

	enterCurrentRoundInputs(input1, input2) {
		var round = this.currentRound;
		if (this.isPlaying && !!round) {
			round.input1 = input1;
			round.input2 = input2;
		}
	}



	_notifyNewRound() {
		this.notify(Match.NEW_ROUND);
	}

	_notifyRoundOver() {
		this.notify(Match.ROUND_OVER);
	}

	_notifyMatchStart() {
		this.notify(Match.START);
	}

	_notifyMatchOver() {
		this.notify(Match.OVER);
	}

	_onRoundReadyToResolve(event) {
		var round = !!this.currentRound && this.currentRound;
		if (event.target === round) {
			round.result = this.game.evaluate(round.input1, round.input2);
		}
	}

	_onRoundResolved(event) {
		var round = !!this.currentRound && this.currentRound;
		if (event.target === round) {

			if (isAcceptableResult(round.result)) {
				this._playedRounds.push(round);
			}
			else {
				console.warn('[Match] - _onRoundResolved() :: round not resolved correctly: ' + round.result);
			}

			this._currentRound = null;
			this._notifyRoundOver();

			if(this._autoplay) {
				this._startNextRound();
			}
			else {
				var roundNumber = this._playedRounds.length;
				if (this._maxRound <= roundNumber) {
					this.stop();
				}
			}
		}
	}

	_startNextRound() {
		var roundNumber = this._playedRounds.length;
		if (roundNumber < this._maxRound) {
			this._currentRound = new Round(roundNumber+1);
			this._currentRound.once(Round.READY_TO_RESOLVE, (event)=> {
				this._onRoundReadyToResolve(event)
			});
			this._currentRound.once(Round.RESOLVED, (event)=> {
				this._onRoundResolved(event)
			});

			this._notifyNewRound();
		}
		else {
			this.stop();
		}
	}

}

export default Match;