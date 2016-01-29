class AbstractRule {

	constructor(itemA, itemB) {
		this.itemA = itemA;
		this.itemB = itemB;
	}
	get items(){
		return [this.itemA, this.itemB];
	}

	match(itemA, itemB) {
		var match = this.itemA === itemA && this.itemB === itemB;
		var reverseMatch = this.itemA === itemB && this.itemB === itemA;
		return match || reverseMatch;
	}

	evaluate() {
		throw new Error(this.prototype, ' method "evaluate()" should be implemented.')
	}

}

export default AbstractRule;