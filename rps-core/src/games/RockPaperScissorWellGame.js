import GameItems from './GameItems';
import WinRule from './../rules/WinRule';
import DrawRule from './../rules/DrawRule';
import RockPaperScissorGame from './RockPaperScissorGame'

const type = 'RockPaperScissorWellGame';

class RockPaperScissorWellGame extends RockPaperScissorGame{

	constructor() {
		throw new Error('RockPaperScissorGame should not be instantiated.');
		super();
	}

	static get type() {
		return type;
	}

	static get symbols() {
		return super.symbols.concat(GameItems.WELL);
	}

	static get rules() {
		var rules = super.rules;
		var extraRules = [
			new DrawRule(GameItems.WELL, GameItems.WELL),
			new WinRule(GameItems.WELL, GameItems.ROCK),
			new WinRule(GameItems.WELL, GameItems.SCISSOR),
			new WinRule(GameItems.PAPER, GameItems.WELL)
		];
		return rules.concat(extraRules);
	}

}

export default RockPaperScissorWellGame;