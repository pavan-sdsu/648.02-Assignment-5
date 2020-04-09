/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */

// eslint-disable-next-line react/prefer-stateless-function

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import ProductList from './ProductList.jsx'
import Edit from './ProductEdit.jsx'

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Redirect exact from="/" to="/products" />
					<Route path="/products" component={ProductList} />
					<Route path="/edit/:id" component={Edit} />
				</Switch>
			</Router>
		)
	}
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
