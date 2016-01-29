import AppDispatcher from './../AppDispatcher'
import GameConstants from './../GameConstants'


var GameActions = {

	newGame: function (gameConfig) {
		AppDispatcher.dispatch({
			action: GameConstants.CREATE_NEW_GAME,
			config: gameConfig
		})
	},

	startGame: function () {
		AppDispatcher.dispatch({
			action: GameConstants.START_GAME
		})
	},

	setPlayerInput: function (input) {
		AppDispatcher.dispatch({
			action: GameConstants.PLAYER_INPUT,
			input: input
		})
	},

	nextRound: function () {
		AppDispatcher.dispatch({
			action: GameConstants.NEXT_ROUND
		})
	},

	replay: function () {
		AppDispatcher.dispatch({
			action: GameConstants.REPLAY
		})
	},

};

module.exports = GameActions;