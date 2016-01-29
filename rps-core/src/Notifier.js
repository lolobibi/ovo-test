import {EventEmitter} from 'events';

class Notifier extends EventEmitter {
	constructor() {
		super();
	}

	notify(noteType, payload){
		var note = {
			target:this,
			type:noteType,
			payload: payload
		};
		this.emit(noteType, note);
	}
}

export default Notifier;