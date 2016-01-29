import RuleResult from './RuleResult';
import AbstractRule from './AbstractRule';

class WinRule extends AbstractRule{

	constructor(winItem, looseItem) {
		if (winItem === looseItem) {
			throw new Error('WinRule can not set up a WinRule between identical items. winItem, looseItem: ', winItem, looseItem);
		}
		super(winItem, looseItem);
	}

	match(itemA, itemB) {
		var match = this.itemA === itemA && this.itemB === itemB;
		var reverseMatch = this.itemA === itemB && this.itemB === itemA;
		return match || reverseMatch;
	}

	/**
	 * Returns
	 * 	Result.WIN
	 * 	Result.LOOSE
	 * 	-1
	 *
	 * @param itemA
	 * @param itemB
	 * @returns {*}
	 */
	evaluate(itemA, itemB) {
		var match = this.itemA === itemA && this.itemB === itemB;
		var reverseMatch = this.itemA === itemB && this.itemB === itemA;

		if (!match && !reverseMatch) {
			console.warn('WinRule can not evaluate with non matching items: ['+this.itemA+','+ this.itemB+'] and ['+ itemA +','+ itemB+']');
		}
		return match ? RuleResult.WIN
			: reverseMatch ? RuleResult.LOOSE
			: RuleResult.UNDETERMINED;
	}

}

export default WinRule;