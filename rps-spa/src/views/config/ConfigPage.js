import './config-page.scss';

//import React from 'react';
var React = require('react');


import GameFactory from './../../stores/GameFactory';

import GameActions from './../../actions/GameActions';
import RouterActions from './../../actions/RouterActions';
import NavBar from './../shared/NavBar';

const configOptions = GameFactory.configurationOptions;

import Page from './../Page';

const OPTION_REFS = {
	GAME_TYPE: 'gameTypeOption',
	ANSWER_TIME: 'answerTimeOption',
	ROUND_NUMBER: 'roundNumberOption'
};

const OPTION_TEXTS = {
	GAME_TYPE: {
		title: 'Game Type: ',
		tip: 'Select the variant you want to play.'
	},
	ANSWER_TIME: {
		title: 'Answer Timer: ',
		tip: 'When playing, the player answer is expected within that time.'
	},
	ROUND_NUMBER: {
		title: 'Number of Round: ',
		tip: 'Select the number of rounds.'
	}
};

const numberOfRoundsOptions = [];
for (var i = configOptions.minRound; i <= configOptions.maxRound; i++) {
	numberOfRoundsOptions.push({name: i, value: i});
}

class ConfigPage extends Page {

	constructor() {
		super();
	}

	onStartButtonClicked(event) {
		var gameTypeOption = this.refs[OPTION_REFS.GAME_TYPE];
		var answerTimeOption = this.refs[OPTION_REFS.ANSWER_TIME];
		var roundNumberOption = this.refs[OPTION_REFS.ROUND_NUMBER];

		var gameType = gameTypeOption.selectedOptions[0].value;
		var answerTime = answerTimeOption.selectedOptions[0].value;
		var roundNumber = roundNumberOption.selectedOptions[0].value;

		var config = GameFactory.createConfiguration(gameType, roundNumber, null, answerTime);
		GameActions.newGame(config);
	}

	onCancelButtonClicked(event) {
		var config;
		RouterActions.goLanding();
	}


	getOtionsBlock(texts, options, reference) {

		return <div className="option-block">
			<div className="line">
				{texts.title}
				<select ref={reference}>
					{
						options.map((option, index)=> {
								return <option key={index} value={option.value}>
									{option.name}
								</option>
							}
						)}
				</select>
			</div>
			<div className="tip">{texts.tip}</div>

		</div>
	}

	renderPageContent() {

		return <div className="config-page">
			<div className="header">
				<NavBar/>
			</div>
			<div className="main-area">
				<h2>Configuration</h2>
				<h5>Please configure your game with the following options:</h5>
				{this.getOtionsBlock(OPTION_TEXTS.GAME_TYPE, configOptions.gameTypes, OPTION_REFS.GAME_TYPE)}
				{this.getOtionsBlock(OPTION_TEXTS.ROUND_NUMBER, numberOfRoundsOptions, OPTION_REFS.ROUND_NUMBER)}
				{this.getOtionsBlock(OPTION_TEXTS.ANSWER_TIME, configOptions.answerTimes, OPTION_REFS.ANSWER_TIME)}
				<button value="start" onClick={this.onStartButtonClicked.bind(this)}>START</button>
			</div>
		</div>
	}
}
export default ConfigPage;

