import AppDispatcher from './AppDispatcher'
import {EventEmitter} from 'events'
import RouteConstants from './RouteConstants';
import GameConstants from './GameConstants';
import GamesStore from './stores/GamesStore';


var _route = RouteConstants.LANDING;


function setRoute(value) {
	_route = value;
}


var Router = Object.assign({}, EventEmitter.prototype, {

	// Returns all shoes
	getRoute: function () {
		return _route;
	},

	emitChange: function () {
		this.emit('change');
	},

	onChange: function (callback) {
		this.on('change', callback);
	},

	offChange: function (callback) {
		this.removeListener('change', callback);
	}
});


AppDispatcher.register(
	function (payload) {

		let action = payload.action;

		switch (action) {

			case RouteConstants.CHANGE:
				if (payload.route !== Router.getRoute()) {
					setRoute(payload.route);
					Router.emitChange();
				}
				break;

			case GameConstants.CREATE_NEW_GAME:

				AppDispatcher.waitFor([
					GamesStore.dispatchToken
				]);

				setRoute(RouteConstants.GAME);
				Router.emitChange();

				break;

			default:
				return true;
		}
		return true;
	});


export default Router;