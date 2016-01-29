import _ from 'lodash';

import GameItems from './GameItems';
import NumericWinRule from './../rules/NumericWinRule';
import NumericDrawRule from './../rules/NumericDrawRule';

import DuelGame from "./DuelGame";


const symbols = [1,2,3,4];

const rules = [
	new NumericWinRule(),
	new NumericDrawRule()
];

const type = 'HighestNumberGame';

var game = new DuelGame(type, symbols, rules);


class HighestNumberGame {

	constructor() {
		throw new Error(type+' should not be instantiated.');
	}

	static get type() {
		return game.type;
	}

	static get symbols() {
		return game.symbols;
	}

	static get rules() {
		return game.rules;
	}

	static evaluate(input1, input2) {
		return game.evaluate(input1, input2);
	}
}

export default HighestNumberGame;