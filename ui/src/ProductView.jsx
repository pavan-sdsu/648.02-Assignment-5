import React, { Component } from 'react'

export default class ProductView extends Component {

	constructor(props) {
		super(props);
		const _id = props.location.pathname.split("/view/")[1];
	}

	render() {
		return (
			<div>
				<h2>Product Detail Page:</h2>
				<h4></h4>
			</div>
		)
	}
}
