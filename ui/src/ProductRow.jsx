import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

class ProductRow extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { _id, Name, Price, Category, Image } = this.props.product;
		console.log(this.props.product);
		
		return (
			<tr>
				<td>{ Name }</td>
				<td>${ Price }</td>
				<td>{ Category }</td>
				<td><a href={ Image } target="_blank">View</a></td>
				<td><Link to={`/edit/${_id}`}>Edit</Link></td>
			</tr>
		)
	}
}

export default withRouter(ProductRow)