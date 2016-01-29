import _ from 'lodash'
import {EventEmitter} from 'events'

import GameResult from 'rps-core/src/games/GameResult'
import Match from 'rps-core/src/Match'

import GameObserver from './GameObserver';

class GameModel {

	/**
	 *
	 * @returns {string}
	 */
	static get PLAYER() {
		return 'PLAYER'
	}

	/**
	 *
	 * @returns {string}
	 */
	static get COMPUTER() {
		return 'COMPUTER'
	}

	/**
	 *
	 * @returns {string}
	 */
	static get DRAW() {
		return 'DRAW'
	}

	/**
	 *
	 * @returns {string}
	 */
	static get _winners_map() {
		var map = {};
		map[Match.DRAW] = GameModel.DRAW;
		map[Match.PLAYER_1] = GameModel.PLAYER;
		map[Match.PLAYER_2] = GameModel.COMPUTER;
		return map;
	}


	/**
	 *
	 * @param id
	 * @param name
	 * @param match {Match}
	 * @param date
	 */
	constructor(id, name, match, date) {
		this.id = id;
		this.date = date;
		this.name = name;
		this.match = match;
		this.observer = new GameObserver(this);
	}

	get symbols() {
		return this.match.game.symbols;
	}

	get isMatchPlaying() {
		return this.match.isPlaying;
	}

	get isMatchOver() {
		return this.match.isOver;
	}

	get lastRoundResult() {
		var lastRound = this.match.lastRound;
		return this.getRoundResult(lastRound);
	}

	get rounds() {
		return _.map(this.match.rounds, (round)=> {
			return this.getRoundResult(round);
		});
	}

	get numberOfRoundPlayed() {
		return this.match.rounds && this.match.rounds.length || 0;
	}

	get numberOfRoundToPlay() {
		return this.match.maxRound;
	}

	/**
	 *
	 * @returns {{player: {Number}, computer: {Number}}}
	 */
	get score() {
		var score = this.match.score;
		return {
			player: score.player1,
			computer: score.player2,
			playedRound: this.numberOfRoundPlayed,
			totalRound: this.numberOfRoundToPlay
		};
	}

	/**
	 *
	 * @returns {string}
	 */
	get winner() {
		var matchWinner = this.match.winner;
		return GameModel._winners_map[matchWinner];
	}

	/**
	 *
	 * @returns {boolean}
	 */
	get isDrawGame() {
		return this.winner === GameModel.DRAW;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	get playerWins() {
		return this.winner === GameModel.PLAYER;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	get computerWins() {
		return this.winner === GameModel.COMPUTER;
	}

	/**
	 *
	 * @returns {{score: {player: {Number}, computer: {Number}}, isDrawGame: boolean, playerWins: boolean, computerWins: boolean}}
	 */
	get result() {
		return {
			score: this.score,
			isDrawGame: this.isDrawGame,
			playerWins: this.playerWins,
			computerWins: this.computerWins
		}
	}

	/**
	 *
	 * @param round
	 * @returns {{playerInput: number, computerInput: number, playerWins: boolean, computerWins: boolean, isDraw: boolean}}
	 */
	getRoundResult(round) {
		var roundResult = round.result;
		return {
			roundId: round.id,
			playerSymbol: round.input1,
			computerSymbol: round.input2,
			playerWins: roundResult === GameResult.PLAYER1_WINS,
			computerWins: roundResult === GameResult.PLAYER2_WINS,
			isDraw: roundResult === GameResult.PLAYERS_DRAW
		};
	}

	startMatch() {
		return this.match.start();
	}

	startMatchNextRound() {
		return this.match.next();
	}

	playerAgainstComputer(playerInput) {
		playerInput = playerInput.toUpperCase();

		var symbols = this.match.game.symbols;

		if (_.includes(symbols, playerInput)) {
			this.match.enterCurrentRoundInputs(playerInput, _.sample(symbols))
		}
		else {
			console.warn('[GamesStore] - setPlayerInput() :: Player input is not recognised: ' + playerInput + ' !');
		}
	}

}


export default GameModel