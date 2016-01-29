import _ from 'lodash'

import GamesList from 'rps-core/src/games/GamesList'
import Match from 'rps-core/src/Match'

import GameModel from './GameModel';

var _counter = 0;
var _lastConfigUsed;


const configurationOptions = {
	gameTypes: [
		{
			name: 'Rock, Paper, Scissor',
			value: GamesList.RockPaperScissorGame.type
		},
		{
			name: 'Rock, Paper, Scissor, Well',
			value: GamesList.RockPaperScissorWellGame.type
		}
	],
	answerTimes: [
		{name: 'fast', value: 100},
		{name: 'normal', value: 2000},
		{name: 'slow', value: 500},
		{name: 'infinite', value: -1}

	],
	minRound: 1,
	maxRound: 5
};

function retrieveGamePerGameType(gameType) {
	return _.find(GamesList, (game)=> {
		return game.type === gameType;
	});
}

function retrieveGameNamePerGameType(gameType) {
	return _.find(configurationOptions.gameTypes, (game)=> {
		return game.value === gameType;
	}).name;
}


var GameFactory = {
	configurationOptions: configurationOptions,

	/**
	 *
	 * @param gameType
	 * @param roundNumber
	 * @param bestOf
	 * @param answerTime
	 * @returns {{gameClass: *, answerTime: number, roundNumber: number, bestOf: boolean}}
	 */
	createConfiguration: (gameType = GamesList.RockPaperScissorGame.type, roundNumber = 3, bestOf = false, answerTime = -1)=> {

		var gameClass = retrieveGamePerGameType(gameType);
		var gameName = retrieveGameNamePerGameType(gameType);

		if (!!gameClass) {
			return {
				gameClass: gameClass,
				gameName: gameName,
				answerTime: answerTime,
				roundNumber: roundNumber,
				bestOf: bestOf
			}
		}
		else {
			console.warn('[GameFactory] - createConfiguration() :: Could not find the gameClass to use, nothing corresponds to gameType of ' + gameType);
		}
	},

	getLastConfigurationUsed: function () {
		return _lastConfigUsed;
	},

	/**
	 *
	 * @param config
	 * @returns {GameModel}
	 */
	createGame: (config)=> {
		config = config || GameFactory.createConfiguration();
		if (!!config) {
			_lastConfigUsed = config;
			var match = new Match(config.gameClass, config.roundNumber, false);
			return new GameModel(_counter++, config.gameName, match, new Date());
		}
		else {
			console.warn('[GameFactory] - createGame() :: Config passed is undefined, no game created.');
		}
	}

};

export default GameFactory;