import './history-page.scss';

//import React from 'react';
var React = require('react');
import GamesStore from './../../stores/GamesStore';

import OverallScore from './../shared/OverallScore';
import NavBar from './../shared/NavBar';
import Page from './../Page';


class HistoryPage extends Page {

	constructor() {
		super();
		this.state = {
			gamesHistory: GamesStore.getGamesHistory(),
			overallScore: GamesStore.getOverallScore()
		};
		this._onGamesStoreChanged = this.onGamesStoreChanged.bind(this);
	}

	componentDidMount() {
		GamesStore.onChange(this._onGamesStoreChanged);

		this.setState({
			gamesHistory: GamesStore.getGamesHistory(),
			overallScore: GamesStore.getOverallScore()
		})

		//date.toLocaleString(undefined, {day: '2-digit', month: '2-digit', year: 'numeric'})
	}

	componentWillUnmount() {
		GamesStore.offChange(this._onGamesStoreChanged);
	}

	componentDidUpdate() {
		this.resizeTableContainer();
	}

	resizeTableContainer() {
		var refMainArea = this.refs.mainArea;
		var refTitle = this.refs.title;
		var refTableContainer = this.refs.tableContainer;

		var measuredHeightMainArea = getComputedStyle(refMainArea).getPropertyValue('height');
		var computedStyleTitle = getComputedStyle(refTitle).getPropertyValue('height');
		var desiredHeight = parseFloat(measuredHeightMainArea) - parseFloat(computedStyleTitle) - 10;

		refTableContainer.style.setProperty('height', desiredHeight + 'px');
	}


	onGamesStoreChanged() {
		this.setState({
			gamesHistory: GamesStore.getGamesHistory(),
			overallScore: GamesStore.getOverallScore()
		});
	}

	renderPageContent() {
		var contentDisplay;
		var gamesHistory = this.state.gamesHistory;

		if (!!gamesHistory && gamesHistory.length > 0) {

			contentDisplay = <table>
				<thead>
				<tr>
					<th>Id</th>
					<th>Created</th>
					<th>Game Name</th>
					<th>Winner</th>
					<th>Score</th>
				</tr>
				</thead>
				<tbody>
				{gamesHistory.map((game)=> {
					return <tr key={game.id}>
						<td>{game.id}</td>
						<td>{game.date.toLocaleString(undefined, {
							day: '2-digit',
							month: '2-digit',
							hour: 'numeric',
							minute: 'numeric',
							second: 'numeric'
						})}</td>
						<td>{game.name}</td>
						<td>{game.winner}</td>
						<td>{game.score}</td>
					</tr>
				})}
				</tbody>
			</table>
		}
		else {
			contentDisplay = <div>No games played, so, nothing to view yet ;-)</div>
		}


		return <div className="history-page">
			<div className="header">
				<NavBar/>
			</div>
			<div ref="mainArea" className="main-area">
				<h2 ref="title">History</h2>
				<div ref="tableContainer" className="table-container">
					{contentDisplay}
				</div>
			</div>
			<div className="footer">
				<OverallScore score={this.state.overallScore}/>
			</div>
		</div>

	}
}
export default HistoryPage;