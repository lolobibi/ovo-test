import _ from 'lodash';

import GameItems from './GameItems';
import WinRule from './../rules/WinRule';
import DrawRule from './../rules/DrawRule';

import DuelGame from "./DuelGame";


const symbols = [
	GameItems.ROCK,
	GameItems.PAPER,
	GameItems.SCISSOR
];

const rules = [
	new DrawRule(GameItems.ROCK, GameItems.ROCK),
	new DrawRule(GameItems.PAPER, GameItems.PAPER),
	new DrawRule(GameItems.SCISSOR, GameItems.SCISSOR),
	new WinRule(GameItems.ROCK, GameItems.SCISSOR),
	new WinRule(GameItems.SCISSOR, GameItems.PAPER),
	new WinRule(GameItems.PAPER, GameItems.ROCK)
];

const type = 'RockPaperScissorGame';


class RockPaperScissorGame {

	constructor() {
		throw new Error('RockPaperScissorGame should not be instantiated.');
	}

	static get type() {
		return type;
	}

	static get symbols() {
		return symbols.slice();
	}

	static get rules() {
		return rules.slice();
	}

	static get game() {
		if(!this.hasOwnProperty('_game')) {
			this._game = new DuelGame(this.type, this.symbols, this.rules);
		}
		return this._game;
	}

	static evaluate(input1, input2) {
		return this.game.evaluate(input1, input2);
	}
}

export default RockPaperScissorGame;