import _ from 'lodash';
import RuleResult from './RuleResult';
import DrawRule from './DrawRule';

class NumericDrawRule extends DrawRule {

	constructor() {
		super();
	}

	match(itemA, itemB) {
		return (itemA === itemB) && _.isNumber(itemA);
	}

	/**
	 * Returns whether or not it is a draw, as A draw with B.
	 * Returns -1 if unknown.
	 *
	 * @param itemA
	 * @param itemB
	 * @returns {boolean}
	 */
	evaluate(itemA, itemB) {
		return this.match(itemA, itemB) && RuleResult.DRAW ||
			RuleResult.UNDETERMINED;
	}

}

export default NumericDrawRule;