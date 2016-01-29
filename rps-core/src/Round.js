import {EventEmitter} from 'events';


class Round extends EventEmitter{

	static get DEFAULT_ID(){
		return -1;
	}

	/**
	 * @return {string}
	 */
	static get READY_TO_RESOLVE(){
		return "Round.READY_TO_RESOLVE";
	}

	/**
	 * @return {string}
	 */
	static get RESOLVED(){
		return "Round.RESOLVED";
	}

	/**
	 *
	 * @param id
	 * @param input1
	 * @param input2
	 * @param result
	 */
	constructor(id = Round.DEFAULT_ID, input1, input2, result) {
		super();
		this._id = id;
		this._pending = true;
		this._resolved = false;

		this._input1 = input1;
		this._input2 = input2;
		this._result = result;

		this._checkState();
	}

	get id() {
		return this._id;
	}

	get isPending() {
		return this._pending;
	}

	get isResolved() {
		return !this.isPending && this._resolved;
	}

	get input1() {
		return this._input1;
	}

	get input2() {
		return this._input2;
	}

	get result() {
		return this._result;
	}

	set input1(value) {
		if (this.isPending && !this.input1) {
			this._input1 = value;
		}
		this._checkState();
	}

	set input2(value) {
		if (this.isPending && !this.input2) {
			this._input2 = value;
		}
		this._checkState();
	}

	set result(value) {
		if (!this.isPending && !this.result) {
			this._result = value;
		}
		this._checkState();
	}

	_checkState() {
		if (this._resolved) return;

		if (this.isPending && !!this.input1 && !!this.input2) {
			this._pending = false;
			this._notifyReadyToResolve();
		}
		if (!!this.result) {
			this._resolved = true;
			this._notifyResolved();
		}
	}

	_notifyReadyToResolve() {
		this._notify(Round.READY_TO_RESOLVE);
	}

	_notifyResolved() {
		this._notify(Round.RESOLVED);
	}

	_notify(type) {
		this.emit(type, {
			type:type,
			target:this
		});
	}
}

export default Round;