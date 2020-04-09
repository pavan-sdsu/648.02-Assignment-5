/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */

// eslint-disable-next-line react/prefer-stateless-function

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import ProductList from './ProductList.jsx'

class App extends Component {
	render() {
		return (
			<Fragment>
				<ProductList></ProductList>
			</Fragment>
		)
	}
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
