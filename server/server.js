require('dotenv').config();

const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { MongoClient } = require('mongodb');
const mongodb = require('mongodb');

const app = express();

const client = new MongoClient(`mongodb+srv://pavan:${process.env.MONGO_PASS}@pavan-sdsu-7v19x.mongodb.net/648-assn-4`, {
	useUnifiedTopology: true,
});

let inventory, counter;
client.connect((err, cl) => {
	const db = cl.db();
	inventory = db.collection('inventory');
	counter = db.collection('counter');
});

async function getNextSequence() {
	const result = await counter.findOneAndUpdate(
		{},
		{ $inc: { count: 1 } },
		{ returnOriginal: false },
	);
	return result.value.count;
}

const resolvers = {
	Query: {
		productList: async () => {
			try {
				const result = await inventory.find({}).toArray();
				return result;
			} catch (error) {
				return [];
			}
		},
		getProduct: async (_, { _id }) => {
			const oid = new mongodb.ObjectID(_id);
			return await inventory.findOne(oid);
		}
	},
	Mutation: {
		addProduct: async (_, {
			Category, Price, Name, Image,
		}) => {
			const PRODUCT = {
				id: await getNextSequence(),
				Category,
				Price,
				Name,
				Image,
			};

			const result = await inventory.insertOne(PRODUCT);
			const savedIssue = await inventory.findOne({ _id: result.insertedId });
			return savedIssue;
		},
		updateProduct: async (_, {
			_id, Category, Price, Name, Image
		}) => {
			const oid = new mongodb.ObjectID(_id);
			await inventory.findOneAndUpdate({_id: oid}, {
				$set: {
					Name: Name,
					Image: Image,
					Price: Price,
					Category: Category
				}
			})

			return await inventory.findOne(oid);
		},
		deleteProduct: async (_, {_id}) => {
			const oid = new mongodb.ObjectID(_id);
			const result = await inventory.findOneAndDelete({ _id: oid })
			return (result.ok == 1);
		}
	},
};

const server = new ApolloServer({
	typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
	resolvers,
});

server.applyMiddleware({ app });

app.listen(process.env.API_SERVER_PORT, () => console.log('Listening on PORT', process.env.API_SERVER_PORT));
