import './page.scss';
import React from 'react';

class Page extends React.Component {


	constructor() {
		super();
	}

	renderPageContent() {
		return;
	}

	render() {
		return <div className={'page' + (this.props.focus?' focus':'')}>
			<div className="content">
				{this.renderPageContent()}
				{this.props.children}
			</div>
		</div>;
	}
}

export default Page;