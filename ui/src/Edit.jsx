import React, { Component } from 'react'
const BASE_URL = "http://localhost:3000";

export default class Edit extends Component {

	state = { product: {} }

	constructor(props) {
		super();
		const _id = props.location.pathname.split("/edit/")[1];
		this.getProduct(_id);
		this.onSubmit = this.onSubmit.bind(this);
	}

	getProduct(_id) {
		const query = `
		query {
			getProduct (_id: "${_id}") {
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
					state["product"] = res.data.getProduct;
					return state;
				})
			})
			.catch(err => console.error(err))
	}

	onSubmit(e) {
		e.preventDefault();
		
		const product = {
			Category: document.getElementById("category").value,
			Price: document.getElementById("price").value,
			Name: document.getElementById("name").value,
			Image: document.getElementById("image").value
		}

		const query = `
		mutation {
			updateProduct (
				Category: [${product.Category}]
				_id: "${this.state.product._id}"
				Name: "${product.Name}"
				Price: ${product.Price}
				Image: "${product.Image}"
			  ) {
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
			console.log(res);
			this.setState((state, props) => {
				state.products = res.data.updateProduct;
				return state;
			})
		})
		.catch(err => console.error(err))	
	}

	render() {
		const {Name, Price, Category, Image} = this.state.product;
		return (
			<div>
				<h2>Update Product</h2>
				<form>
					<div className="input-group">
						<label htmlFor="category">Category:</label>
						<select name="category" id="category" defaultValue={Category}>
							<option value="Accessories">Accessories</option>
							<option value="Shirts">Shirts</option>
							<option value="Jeans">Jeans</option>
							<option value="Jackets">Jackets</option>
							<option value="Sweaters">Sweaters</option>
						</select>
					</div>
					<div className="input-group">
						<label htmlFor="price">Price:</label>
						<input type="text" id="price" defaultValue={Price} />
					</div>
					<div className="input-group">
						<label htmlFor="name">Product Name:</label>
						<input type="text" id="name" defaultValue={Name} />
					</div>
					<div className="input-group">
						<label htmlFor="image">Image URL:</label>
						<input type="text" id="image" defaultValue={Image} />
					</div>

					<button type="submit" onClick={this.onSubmit}>Update Product</button>
				</form>
			</div>
		)
	}
}
