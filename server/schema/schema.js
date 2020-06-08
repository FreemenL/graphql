const graphql = require('graphql');

const Book = require("../models/book");
const Author = require("../models/author");

const { 
  GraphQLSchema,
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID,
  GraphQLInt ,
  GraphQLList
} = graphql;

// const books = [
//   { name: "算法导论", genre: "计算机科学", id: "1" ,authorId:"1"},
//   { name: "人性的弱点", genre: "社交", id: "2", authorId:"2" },
//   { name: "明朝那些事儿", genre: "历史", id: "3" , authorId:"3" },
//   { name: "react", genre: "技术", id: "4" , authorId:"3" },
//   { name: "vue", genre: "技术", id: "5" , authorId:"3" },
// ];

// const author = [
//   {name: "baidu", age:12, id:"2"},
//   {name: "tengxun", age:11, id:"1"},
//   {name: "ali", age:10, id:"3"}
// ];


const AuthorType = new GraphQLObjectType({
  name:"Author", 
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString},
    age: { type: GraphQLInt},
    books: { 
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({authorId: parent.id});
      }
    }
  })
})


// 连表查询
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
      type: AuthorType,
      resolve(parent,args){
        return Author.findById(parent.authorId);
      }
    }
  })
});

// {
//   books{
//     name
//     genre
//     id
//     author{
//       id
//       name
//       age
//     }
//   }
// }

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: { 
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: {id:{ type: GraphQLID }},
      resolve(parent, args) {
        return Author.findById(args.id)
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});

// 修改数据

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },  
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre : { type: GraphQLString },
        authorId: { type: GraphQLString },  
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      }
    }
  }
});

// mutation  {
//   addBook (name:"明朝那些事儿",genre:"历史",authorId:"5eda1b5c1281860706b654e7"){
//    name
//    genre
//  }
// }

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
