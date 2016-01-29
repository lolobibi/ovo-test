import './landing-page.scss';

//import React from 'react';
var React = require('react');

import GameActions from './../../actions/GameActions';
import RouterActions from './../../actions/RouterActions';
import GamesStore from './../../stores/GamesStore';

import OverallScore from './../shared/OverallScore';
import Page from './../Page';

class LandingPage extends Page {

	static get buttonsID() {
		return {
			QUICK_GAME: 'quick-game',
			RESUME_GAME: 'resume-game',
			CUSTOM_GAME: 'custom-game',
			GAME_HISTORY: 'game_history'
		}
	}

	constructor() {
		super();
		this.state = {
			canResume: !!GamesStore.getCurrentGame(),
			overallScore: GamesStore.getOverallScore(),
			totalGamesPlayed: GamesStore.getTotalGamesPlayed()
		};
		this._onGamesStoreChanged = this.onGamesStoreChanged.bind(this);
	}

	componentDidMount() {
		GamesStore.onChange(this._onGamesStoreChanged);

		this.setState({
			canResume: !!GamesStore.getCurrentGame(),
			overallScore: GamesStore.getOverallScore(),
			totalGamesPlayed: GamesStore.getTotalGamesPlayed()
		});
	}

	componentWillUnmount() {
		GamesStore.offChange(this._onGamesStoreChanged);
	}

	onGamesStoreChanged() {
		this.setState({
			canResume: !!GamesStore.getCurrentGame(),
			overallScore: GamesStore.getOverallScore(),
			totalGamesPlayed: GamesStore.getTotalGamesPlayed()
		});
	}

	onButtonClicked(event) {
		var button = event.currentTarget;

		switch (button.id) {
			case LandingPage.buttonsID.QUICK_GAME:
				GameActions.newGame();
				break;

			case LandingPage.buttonsID.CUSTOM_GAME:
				RouterActions.goConfig();
				break;

			case LandingPage.buttonsID.RESUME_GAME:
				RouterActions.goGame();
				break;

			case LandingPage.buttonsID.GAME_HISTORY:
				RouterActions.goHistory();
				break;
		}
	}

	createButton(id, caption) {
		return <button id={id} onClick={this.onButtonClicked.bind(this)}>{caption}</button>
	}

	renderPageContent() {
		return <div className="landing-page">
			<div className="header">
				<h1>Welcome to RPS</h1>
			</div>
			<div className="buttons">
				{this.state.canResume && this.createButton(LandingPage.buttonsID.RESUME_GAME, "Resume Game")}
				{this.createButton(LandingPage.buttonsID.QUICK_GAME, "Quick Game")}
				{this.createButton(LandingPage.buttonsID.CUSTOM_GAME, "Custom Game")}
				{this.createButton(LandingPage.buttonsID.GAME_HISTORY, "History")}
			</div>
			<div className="footer">
				{(this.state.totalGamesPlayed > 0) && <OverallScore score={this.state.overallScore}/>}
			</div>
		</div>
	}
}
export default LandingPage;
