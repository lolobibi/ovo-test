import './overall-score.scss';

var React = require('react');

class OverallScore extends React.Component {
	render() {
		var score = this.props.score;
		if (score) {
			return <div className="overall-score">
				All Games Score:
				<div className="scores">
					<div className="score-item">{'Player: ' + score.player}</div>
					<div className="score-item">{'Draw: ' + score.draw}</div>
					<div className="score-item">{'Computer: ' + score.computer}</div>
				</div>
			</div>;
		}
	}
}
export default OverallScore;