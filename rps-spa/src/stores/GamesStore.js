import _ from 'lodash';
import AppDispatcher from './../AppDispatcher';
import GameConstants from './../GameConstants';
import GameFactory from './GameFactory';

import {EventEmitter} from 'events'

/**
 *
 * @type {GameModel}
 * @private
 */
var _currentGame = null;

/**
 *
 * @type {GameModel[]}
 * @private
 */
var _games = [];

var GamesStore = Object.assign({}, EventEmitter.prototype, {

	getGames: function () {
		return _games;
	},

	getTotalGamesPlayed: function () {
		return _games.length;
	},

	getGamesHistory: function () {

		var games = _.map(_games, (gameModel)=> {
			let score = gameModel.score.player + ' - ' + gameModel.score.computer;
			return {
				id: gameModel.id,
				name: gameModel.name,
				date: gameModel.date,
				winner: gameModel.winner,
				score: score
			}
		});

		return games.sort(function (gameA, gameB) {
			return gameB.id - gameA.id
		})
	},

	/**
	 *
	 * @returns {{player: number, computer: number, draw: number}}
	 */
	getOverallScore: function () {
		var overallScore = {
			player: 0,
			computer: 0,
			draw: 0
		};

		_.each(_games, (gameModel)=> {
			overallScore.draw += gameModel.isDrawGame ? 1 : 0;
			overallScore.player += gameModel.playerWins ? 1 : 0;
			overallScore.computer += gameModel.computerWins ? 1 : 0;
		});

		return overallScore
	},

	/**
	 *
	 * @returns {GameObserver}
	 */
	getCurrentGame: function () {
		return _currentGame && _currentGame.observer;
	},

	emitChange: function () {
		this.emit('change');
	},

	onChange: function (callback) {
		this.on('change', callback);
	},

	offChange: function (callback) {
		this.removeListener('change', callback);
	}
});


function onGameCompleted() {
	_games.push(_currentGame);
	_currentGame = null;
	GamesStore.emitChange();
}

function createNewGame(config) {
	_currentGame = GameFactory.createGame(config);
	_currentGame.observer.onCompleted(onGameCompleted);
}

function replayLastGame() {
	createNewGame(GameFactory.getLastConfigurationUsed());
}

function startCurrentGame() {
	if (!!_currentGame) {

		if (!_currentGame.isMatchPlaying) {
			_currentGame.startMatch();
		} else {
			console.warn('[GamesStore] - startCurrentGame() :: Current Game is already started!');
		}

	} else {
		console.warn('[GamesStore] - startCurrentGame() :: No Current Game!');
	}
}

function setPlayerInput(playerInput) {
	if (!!_currentGame) {
		if (_currentGame.isMatchPlaying) {
			_currentGame.playerAgainstComputer(playerInput);
		} else {
			console.warn('[GamesStore] - setPlayerInput() :: Current Game is not playing!');
		}
	} else {
		console.warn('[GamesStore] - setPlayerInput() :: No Current Game!');
	}
}

function playNextRound() {
	if (!!_currentGame) {

		if (_currentGame.isMatchPlaying) {
			_currentGame.startMatchNextRound();
		} else {
			console.warn('[GamesStore] - playNextRound() :: Current Game is not playing!');
		}
	} else {
		console.warn('[GamesStore] - playNextRound() :: No Current Game!');
	}
}


GamesStore.dispatchToken = AppDispatcher.register(
	function (payload) {

		let action = payload.action;

		switch (action) {

			case GameConstants.CREATE_NEW_GAME:
				createNewGame(payload.config);
				GamesStore.emitChange();
				break;

			case GameConstants.START_GAME:
				startCurrentGame();
				break;

			case GameConstants.PLAYER_INPUT:
				setPlayerInput(payload.input);
				break;

			case GameConstants.NEXT_ROUND:
				playNextRound();
				break;

			case GameConstants.REPLAY:
				replayLastGame();
				GamesStore.emitChange();
				break;

			default:
				return true;
		}
		return true;
	});


export default GamesStore;