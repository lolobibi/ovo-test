class AbstractGame {
	constructor() {
		var forbidden = AbstractGame.prototype ===  Object.getPrototypeOf(this);
		if(forbidden){
			throw new Error('AbstractGame should not be instantiated.');
		}
	}
	static get type() {
		throw new Error(AbstractGame.prototype, '"get type()" should be implemented.')
	}

	static evaluate() {
		throw new Error(AbstractGame.prototype, '"evaluate()" Should be implemented.');
	}

}

export default AbstractGame;