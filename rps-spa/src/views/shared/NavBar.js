import './nav-bar.scss';
import RouterActions from './../../actions/RouterActions';

var React = require('react');

class NavBar extends React.Component {

	onBackClicked(event) {
		RouterActions.goLanding();
	}

	render() {
		return <div className="nav-bar">
			<button className="back" onClick={this.onBackClicked.bind(this)}>Back</button>
		</div>;
	}
}
export default NavBar;