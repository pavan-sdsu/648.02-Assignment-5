import React, { Component } from 'react'

export default class Edit extends Component {
	
	render() {
		const _id = this.props.location.pathname.split("/edit/")[1];

		return (
			<div>
				<h2>Hello Wordl</h2>
			</div>
		)
	}
}
