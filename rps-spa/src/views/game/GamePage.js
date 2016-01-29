import './game-page.scss';

var React = require('react');

import GamesStore from './../../stores/GamesStore';

import OverallScore from './../shared/OverallScore';
import NavBar from './../shared/NavBar';
import Game from './Game';
import Page from './../Page';

class GamePage extends Page {

	constructor() {
		super();
		this.state = {
			game: GamesStore.getCurrentGame(),
			overallScore: GamesStore.getOverallScore()
		}
		this._onGamesStoreChanged = this.onGamesStoreChanged.bind(this);
	}

	componentDidMount() {
		GamesStore.onChange(this._onGamesStoreChanged);
		this.setState({
			game: GamesStore.getCurrentGame(),
			overallScore: GamesStore.getOverallScore()
		})
	}

	componentWillUnmount() {
		GamesStore.offChange(this._onGamesStoreChanged);
	}

	onGamesStoreChanged() {
		this.setState({
			game: GamesStore.getCurrentGame(),
			overallScore: GamesStore.getOverallScore()
		});
	}

	renderPageContent() {
		var game = this.state.game;

		return <div className="game-page">
			<NavBar/>
			<Game game={game}/>
			<OverallScore score={this.state.overallScore}/>
		</div>;
	}

}
export default GamePage;