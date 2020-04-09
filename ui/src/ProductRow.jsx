import React, { Component } from 'react'

export default class ProductRow extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { Name, Price, Category, Image } = this.props.product;
		return (
			<tr>
				<td>{ Name }</td>
				<td>${ Price }</td>
				<td>{ Category }</td>
				<td><a href={ Image } target="_blank">View</a></td>
			</tr>
		)
	}
}