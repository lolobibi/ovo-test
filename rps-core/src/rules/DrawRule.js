import RuleResult from './RuleResult';
import AbstractRule from './AbstractRule';

class DrawRule extends AbstractRule{

	constructor(itemA, itemB) {
		super(itemA, itemB)
	}


	/**
	 * Returns whether or not the items are drawing
	 * @param itemA
	 * @param itemB
	 * @returns {Boolean}
	 */
	evaluate(itemA, itemB) {
		return this.match(itemA, itemB) && RuleResult.DRAW ||
			RuleResult.UNDETERMINED;
	}

}

export default DrawRule;