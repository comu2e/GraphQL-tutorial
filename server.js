const express = require('express');

const {graphqlHTTP} = require('express-graphql');

const {buildSchema} = require('graphql')
//スーマはあくまで定義だけ
//実際のデータ操作はしない

const schema =buildSchema('type Query{hello:String}');

//リゾルバ関数
//特定のフィールドのデータを返す関数
//実際のデータ操作を行う部分
const root = {
    hello:() => {
        return 'Hello World!';
    },
};
//expressでサーバを建てる
const app = express();
app.use('/graphql',graphqlHTTP({
    schema:schema,
    rootValue:root,
    //GraphQLを利用できるようにtrueにする
    graphiql:true
}));

app.listen(4000);
console.log("Runnnig a graphQL api server at http://localhost:4000/graphql")

/***起動後はhttp://localhost:4000/graphqlにアクセスして
query {
   hello

}を実行する

**/
/***
 {
  "data": {
    "hello": "Hello World!"
  }
}
 **/