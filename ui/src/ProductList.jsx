const BASE_URL = "http://localhost:3000";

import React, { Component, Fragment } from 'react'

import ProductAdd from './ProductAdd.jsx'
import ProductTable from './ProductTable.jsx'

export default class ProductList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
		this.addProduct = this.addProduct.bind(this);
		this.getProducts()
	}

	getProducts() {
		const query = `
		query {
			productList {
				_id
				id
				Category
				Price
				Name
				Image
			}
		}
		`;

		fetch(BASE_URL + "/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query })
		})
		.then(res => res.json())
		.then((res) => {
			this.setState((state, props) => {
				state.products = res.data.productList;
				return state;
			})
		})
		.catch(err => console.error(err))
	}

	addProduct(product) {
		const query = `
		mutation {
			addProduct (
				Category: [` + product.Category + `]
				Name: "` + product.Name + `"
				Price: ` + product.Price + `
				Image: "` + product.Image + `"
			) {
				_id
				id
				Category
				Price
				Name
				Image
			}
		}
		`;

		fetch(BASE_URL + "/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query })
		})
		.then(res => res.json())
		.then((res) => {
			this.setState((state, props) => {
				state.products.push(res.data.addProduct);
				return state;
			})
		})
		.catch(err => console.error(err))
	}

	render() {
		return (
			<Fragment>
				<h2>My Company Inventory</h2>
				<ProductTable products={this.state.products} />
				<ProductAdd addProduct={this.addProduct} />
			</Fragment>
		)
	}
}