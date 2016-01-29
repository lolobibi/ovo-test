import './views/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import AppView from './views/AppView';

main();

function main() {
	ReactDOM.render(<AppView/>, document.getElementById('app'));
}