import React, { Component } from 'react'

import ProductRow from './ProductRow.jsx'

export default class ProductTable extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const rows = this.props.products.map(p => <ProductRow product={p} key={p.id} />)
		return (
			<section>
				<p>Showing all available products</p>
				<hr />
				<table>
					<thead>
						<tr>
							<td>Product Name</td>
							<td>Price</td>
							<td>Category</td>
							<td>Image</td>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</ section>
		)
	}
}