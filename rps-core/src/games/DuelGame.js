import _ from 'lodash';
import GameResult from './GameResult';
import RuleResult from './../rules/RuleResult';
import WinRule from './../rules/WinRule';
import DrawRule from './../rules/DrawRule';

import AbstractGame from "./AbstractGame"

class DuelGame extends AbstractGame {

	constructor(type, symbols, rules) {
		super();
		this._type = type;
		this._symbols = symbols;
		this._rules = rules;

		if (_.isFunction(this.constructor.validate)) this.constructor.validate(this);
		else DuelGame.validate(this);
	}

	/**
	 *
	 * @returns {String}
	 */
	get type() {
		return this._type || 'Duel';
	}

	/**
	 *
	 * @returns {Array}
	 */
	get symbols() {
		return this._symbols.slice();
	}

	/**
	 *
	 * @returns {Array}
	 */
	get rules() {
		return this._rules.slice();
	}


	/**
	 * Returns
	 *    GameResult.PLAYERS_DRAW
	 *    GameResult.PLAYER1_WINS
	 *    GameResult.PLAYER2_WINS
	 *    GameResult.UNDETERMINED
	 *
	 * @param input1
	 * @param input2
	 * @returns {GameResult.PLAYERS_DRAW|GameResult.PLAYER1_WINS|GameResult.PLAYER2_WINS|GameResult.UNDETERMINED}
	 */
	evaluate(input1, input2) {
		for (let i in arguments) {
			let arg = arguments[i];
			if (!_.includes(this._symbols, arg)) {
				console.log('[DuelGame] - evaluate() :: this.type = ', this.type);
				console.log('[DuelGame] - evaluate() :: this._symbols = ', this._symbols);
				throw new Error('Illegal parameter passed to "evaluate" method, only game symbols, "null" or "undefined" are accepted, not: ' + arg);
			}
		}

		var rule = _.find(this._rules, function (rule) {
			return rule.match(input1, input2);
		});

		if (!!rule) {
			var result = rule.evaluate(input1, input2);

			if (rule instanceof DrawRule) {
				if (result === RuleResult.DRAW) return GameResult.PLAYERS_DRAW;
			}

			if (rule instanceof WinRule) {
				if (result === RuleResult.WIN) return GameResult.PLAYER1_WINS;
				if (result === RuleResult.LOOSE) return GameResult.PLAYER2_WINS;
			}
			return GameResult.UNDETERMINED;
		}

		throw new Error('Could not find matching rule.');
	}

	/**
	 * Throw an error if game properties are not valid
	 */
	static validate(gameInstance) {
		var message;

		if (!gameInstance instanceof DuelGame) {
			message = 'Parameter "instance" is not instanceof "DuelGame"';
			throw new Error(message);
		}

		message = 'DuelGame of type "' + gameInstance.type + '" is not valid.';

		if (!gameInstance._rules || !gameInstance._rules.length < 0 || !_.every(gameInstance.rules, (rule)=> {
				return (rule instanceof WinRule) || (rule instanceof DrawRule)
			})) {

			message += '\nMissing or empty "rules" property; or non valid rule within.';
			throw new Error(message);
		}
		if (!gameInstance._symbols || !gameInstance._symbols.length < 0) {
			message += '\nMissing or empty "symbols" property.';
			throw new Error(message);
		}

		try {
			isRulesProof(gameInstance);
		}
		catch (err) {
			message += '\nIncomplete set of rules for game.';
			message += '\nerr: ' + err.message;
			throw new Error(message);
		}

		function isRulesProof(game) {
			_.each(game._symbols, (symbolA) => {
				_.each(game._symbols, (symbolB)=> {
					try {
						let result = game.evaluate(symbolA, symbolB);
						if (result === GameResult.UNDETERMINED) {
							console.warn(game.type, ' Unknown result', symbolA, '+', symbolA, '->', result);
						}
					} catch (err) {
						var message = '\nMissing rule for combination "' + symbolA + '" + "' + symbolB + '"';
						throw new Error(message);
					}
				})
			})
		}
	}

}

export default DuelGame;