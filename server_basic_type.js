const express = require('express');

const {graphqlHTTP} = require('express-graphql');

const {buildSchema} = require('graphql')
// GraphQLスキーマ言語を記述してスキーマを構築する
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

// リゾルバ関数
const root = {
//スキーマで定義した「quoteOfTheDay: String」のデータ操作
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
//スキーマで定義した「random: Float!」のデータ操作
  random: () => {
    return Math.random();
  },
//スキーマで定義した「rollThreeDice: [Int] 」のデータ操作
  rollThreeDice: () => {
    return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
  },
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);