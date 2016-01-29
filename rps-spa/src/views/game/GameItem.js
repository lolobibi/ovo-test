import './game-item.scss';

var React = require('react');

class GameItem extends React.Component {

	constructor() {
		super();
		this._game = null;
		this.state = {
			gameStarted: false,
			roundStarted: false,
			roundResult: false,
			roundCompleted: false,
			gameCompleted: false
		};
	}

	onClicked() {
		if (this.props.onSelect) {
			this.props.onSelect(this.props.name);
		}
	}

	render() {
		var name = this.props.name.toLowerCase();
		var isSelectable = !!this.props.onSelect;
		var isMini = this.props.mini;
		var className = "game-item";
		className += isSelectable ? ' selectable' : '';
		className += isMini ? ' mini' : '';


		return <div onClick={this.onClicked.bind(this)} className={className}>
			<div className={"picture " +name}></div>
			{!isMini && <div className={"label"}>{name}</div>}
		</div>
	}
}
export default GameItem