import './app-view.scss';

//import React from 'react';
//import {Component} from 'react';
var React = require('react');

import LandingPage from './landing/LandingPage';
import HistoryPage from './history/HistoryPage';
import ConfigPage from './config/ConfigPage';
import GamePage from './game/GamePage';

import RouteConstants from './../RouteConstants';
import Router from './../Router';

class AppView extends React.Component {

	constructor() {
		super();
		this.state = {
			page: Router.getRoute()
		}
	}

	componentDidMount() {
		Router.onChange(()=> {
			this.onRouteChanged()
		})
	}

	componentWillMount() {
		Router.offChange(()=> {
			this.onRouteChanged()
		})
	}

	onRouteChanged() {
		this.setState({
			page: Router.getRoute()
		});
	}


	renderLandingPage(focus) {
		return <LandingPage focus={focus}/>;
	}

	renderHistoryPage(focus) {
		return <HistoryPage focus={focus}/>;
	}

	renderConfigPage(focus) {
		return <ConfigPage focus={focus}/>;
	}

	renderGamePage(focus) {
		return <GamePage focus={focus}/>;
	}


	render() {
		var page = this.state.page;

		return <div className="app-view">
			{page === RouteConstants.LANDING && this.renderLandingPage()}
			{page === RouteConstants.GAME_HISTORY && this.renderHistoryPage()}
			{page === RouteConstants.CONFIG && this.renderConfigPage()}
			{page === RouteConstants.GAME && this.renderGamePage()}
		</div>


	}

}

export default AppView;