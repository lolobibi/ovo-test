import './game.scss';

var React = require('react');


import GameItem from './GameItem';
import GameActions from './../../actions/GameActions';

class Game extends React.Component {

	constructor() {
		super();
		this._game = null;
		this.state = {
			gameStarted: false,
			roundStarted: false,
			roundResult: null,
			roundCompleted: false,
			roundWasLastOne: false,
			gameCompleted: false
		};

		this._onGameStarted = this.onGameStarted.bind(this);
		this._onGameCompleted = this.onGameCompleted.bind(this);
		this._onGameRoundStarted = this.onGameRoundStarted.bind(this);
		this._onGameRoundResult = this.onGameRoundResult.bind(this);
		this._onGameRoundCompleted = this.onGameRoundCompleted.bind(this);
	}

	componentDidUpdate() {
		this.resizeScene();
	}

	componentWillUnmount() {
		this.removeGameListeners();
	}

	resizeScene() {
		var refGame = this.refs.game;
		var refScene = this.refs.scene;
		if (refGame && refScene) {
			var computedStyle = getComputedStyle(refGame);
			var measuredWidth = computedStyle.getPropertyValue('width');
			var measuredHeight = computedStyle.getPropertyValue('height');
			refScene.style.setProperty('width', measuredWidth);
			refScene.style.setProperty('height', measuredHeight);
		}
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.game != this._game) {

			if (!!this._game) {
				this.removeGameListeners();
			}

			if (!!nextProps.game) {

				this._game = nextProps.game;
				this.addGameListeners();

				var newState = {
					gameStarted: this._game.hasStarted(),
					roundStarted: this._game.hasRoundStarted(),
					roundResult: null,
					roundCompleted: false,
					roundWasLastOne: false,
					gameCompleted: this._game.hasCompleted()
				};

				//Resume edge case. To fix.
				if (newState.gameStarted && !newState.roundStarted) {
					GameActions.nextRound();
				}

				this.setState(newState);
			}
		}
	}

	onGameStarted() {
		this.setState({
			gameStarted: true
		});
	}

	onGameCompleted() {
		this.setState({
			gameCompleted: true
		});
	}

	onGameRoundStarted() {
		this.setState({
			roundStarted: true,
			roundResult: false,
			roundCompleted: false
		});
	}

	onGameRoundResult(result) {
		this.setState({
			roundResult: result
		});
	}

	onGameRoundCompleted(isLastRound) {
		this.setState({
			roundCompleted: true,
			roundWasLastOne: isLastRound
		});
	}

	addGameListeners() {
		var game = this._game;
		if (!!game) {
			game.onStarted(this._onGameStarted);
			game.onCompleted(this._onGameCompleted);
			game.onRoundStarted(this._onGameRoundStarted);
			game.onRoundResult(this._onGameRoundResult);
			game.onRoundCompleted(this._onGameRoundCompleted);
		}
	}

	removeGameListeners() {
		var game = this._game;
		if (!!game) {
			game.offStarted(this._onGameStarted);
			game.offCompleted(this._onGameCompleted);
			game.offRoundStarted(this._onGameRoundStarted);
			game.offRoundResult(this._onGameRoundResult);
			game.offRoundCompleted(this._onGameRoundCompleted);
		}
	}


	onStartGameClicked() {
		GameActions.startGame();
	}

	onGameItemSelected(itemName) {
		GameActions.setPlayerInput(itemName);
	}

	onNextRoundClicked() {
		GameActions.nextRound();
	}

	onReplayGameClicked() {
		GameActions.replay();
	}


	renderGameRound() {
		if (this.state.gameStarted) {


			return !this.state.roundResult ?
				this.renderRoundPlaying() : this.renderRoundResult();

		}
	}

	renderRoundPlaying() {
		if (!this.state.roundResult) {
			var symbols = this._game.getSymbols();
			return <div className="round">
				<h4 className="title">Round Playing</h4>
				<div className="message">Pick your items!</div>
				<div className="items">
					{symbols.map((symbol)=> {
						return <GameItem key={'key-'+symbol} name={symbol}
										 onSelect={this.onGameItemSelected.bind(this)}/>
					})}
				</div>
			</div>
		}
	}

	renderRoundResult() {
		if (!!this.state.roundResult) {
			var result = this.state.roundResult;
			var playerSymbol = result.playerSymbol;
			var computerSymbol = result.computerSymbol;
			var message = (result.isDraw) ? "Draw!"
				: (result.playerWins) ? "You win!"
				: "You loose!";

			var showNextRoundButton = this.state.roundCompleted && !this.state.roundWasLastOne;
			message += showNextRoundButton ? '...this time.' : '';

			return <div className="round">
				<h4 className="title">Round Result</h4>
				<div className="message">{message}</div>
				<div className="action">
					{showNextRoundButton && <button onClick={this.onNextRoundClicked.bind(this)}>Next Round</button>}
				</div>
				<div className="items">
					<GameItem key={'key-playerSymbol'} name={playerSymbol}/>
					<div>VS</div>
					<GameItem key={'key-computerSymbol'} name={computerSymbol}/>
				</div>

			</div>;
		}
	}

	renderGameScore() {
		var score = this._game.getScore();
		return <div className="score">
			<div className="score-item">{'Player: ' + score.player}</div>
			<div className="round-info">{'Round: ' + score.playedRound + '/' + score.totalRound}</div>
			<div className="score-item">{'Computer: ' + score.computer}</div>
		</div>
	}

	renderGameHistory() {
		var rounds = this._game.getRounds();
		if (rounds.length > 0) {
			return <div className="history">
				<div>History:</div>
				{rounds.map((round, index)=> {
					var player = round.playerSymbol;
					var computer = round.computerSymbol;
					var result = (round.isDraw) ? 'draw'
						: (round.playerWins) ? 'win'
						: 'loose';

					return <div className={"round-row "+result} key={'round'+index}>
						<div>{(index + 1) + '.'}</div>
						<GameItem key={'player'} name={player} mini={true}/>
						<div>vs</div>
						<GameItem key={'computer'} name={computer} mini={true}/>
					</div>
				})}
			</div>
		}
	}

	renderGameCompleted() {
		if (this.state.gameCompleted) {
			var result = this._game.getResult();

			var winnerMessage = result.isDrawGame ? 'Well, this is a Draw match.'
				: result.playerWins ? 'Yeah, you beat the computer!'
				: 'No..., the computer was too strong!';

			var scoreMessage = result.score.player + ' - ' + result.score.computer;

			return <div className="completed">
				<div className="centered">
					<h3>Game is Over</h3>
					<h4>{scoreMessage}</h4>
					<div>{winnerMessage}</div>
					<button onClick={this.onReplayGameClicked.bind(this)}>Replay!</button>
				</div>
			</div>
		}
	}


	render() {

		if (!!this._game) {

			var sceneDisplay;

			var hasGameToShow = this.state.gameStarted || this.state.gameCompleted;

			if (hasGameToShow) {
				sceneDisplay = <div ref="scene" className="scene">
					{this.renderGameScore()}
					<div className="main-area">
						{this.renderGameRound()}
						{this.renderGameHistory()}
					</div>
					{this.renderGameCompleted()}
				</div>
			}
			else {
				sceneDisplay = <div ref="scene" className="scene">
					<div className="start-item">
						<div className="tip">Let's play some</div>
						<h2>{this._game.getName()}</h2>
					</div>
					<div className="start-item">
						<button onClick={this.onStartGameClicked.bind(this)}>Start Game</button>
						<div className="tip">Ready? Click Start Game</div>
					</div>
				</div>
			}

			return <div ref="game" className="game">
				{sceneDisplay}
			</div>;

		}
		else {
			return <div className="game">
				<div ref="scene" className="scene">
					No Game Found
				</div>
			</div>
		}
	}

}
export default Game;