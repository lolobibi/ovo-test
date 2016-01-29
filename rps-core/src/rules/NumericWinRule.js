import _ from 'lodash';

import RuleResult from './RuleResult';
import WinRule from './WinRule';

class NumericWinRule extends WinRule{

	constructor() {
		super(1, 0);
	}

	match(itemA, itemB) {
		return _.isNumber(itemA) && _.isNumber(itemB) && (itemB !== itemA);
	}

	/**
	 * Returns whether or not it is a win, as A beats B.
	 * Returns -1 if unknown.
	 *
	 * @param itemA
	 * @param itemB
	 * @returns {boolean}
	 */
	evaluate(itemA, itemB) {
		return this.match(itemA, itemB)?
			(itemB < itemA ?
				RuleResult.WIN
				:RuleResult.LOOSE)
			: RuleResult.UNDETERMINED;
	}

}

export default NumericWinRule;