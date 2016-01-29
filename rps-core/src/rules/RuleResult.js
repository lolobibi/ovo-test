class RuleResult{
	/**
	 * @return {string}
	 */
	static get UNDETERMINED() {
		return 'RuleResult.UNDETERMINED';
	}

	/**
	 * @return {string}
	 */
	static get DRAW() {
		return 'RuleResult.DRAW';
	}

	/**
	 * @return {string}
	 */
	static get WIN() {
		return 'RuleResult.WIN';
	}

	/**
	 * @return {string}
	 */
	static get LOOSE() {
		return 'RuleResult.LOOSE';
	}
}

export default RuleResult;