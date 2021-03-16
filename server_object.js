const express = require('express');

const {graphqlHTTP} = require('express-graphql');

const {buildSchema} = require('graphql')
// GraphQLスキーマ言語を記述してスキーマを構築する
const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

// リゾルバ関数内の処理をクラス化することも可能です
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    let output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// リゾルバ関数
const root = {
  getDie: ({numSides}) => {
    return new RandomDie(numSides || 6);
  }
}

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

/***
 query{
  getDie(numSides:3){
    numSides
    rollOnce
    roll(numRolls:5)
  }
}
 =>
 {
  "data": {
    "getDie": {
      "numSides": 3,
      "rollOnce": 2,
      "roll": [
        1,
        1,
        1,
        3,
        2
      ]
    }
  }
}


 **/