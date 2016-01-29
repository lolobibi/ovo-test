import AppDispatcher from './../AppDispatcher'
import RouteConstants from './../RouteConstants'


var RouterActions = {

	navigate: function (routeName) {
		AppDispatcher.dispatch({
			action: RouteConstants.CHANGE,
			route: routeName
		})
	},

	goLanding: function () {
		this.navigate(RouteConstants.LANDING);
	},

	goHistory: function () {
		this.navigate(RouteConstants.GAME_HISTORY);
	},

	goConfig: function () {
		this.navigate(RouteConstants.CONFIG);
	},

	goGame: function () {
		this.navigate(RouteConstants.GAME);
	}

};

module.exports = RouterActions;