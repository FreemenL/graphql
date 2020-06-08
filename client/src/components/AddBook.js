import React, { useState } from 'react';
import { useQuery  ,useMutation} from '@apollo/react-hooks';
import { GET_AUTHORS ,ADD_BOOK, GET_BOOKS } from '../querys/index';

function AddBook() {
  const [ name, setName ] = useState("");
  const [ genre, setGener ] = useState("");
  const [ authorId, setAuthorId ] = useState(1);
  const { loading, data } = useQuery(GET_AUTHORS);

  const [ addBook ] = useMutation(ADD_BOOK,{
    variables: { 
      name,
      genre,
      authorId
    },
    refetchQueries: [{ query: GET_BOOKS }]
  });

  const displayAuthors = ()=>{
      if(loading){
       return (
         <option disabled >loading data... </option>
       )
      }else{
        return (
          <>
          {data.authors.map(item=>(
            <option key={item.id} value={item.id} >{item.name}</option>
          ))}
          </>
        )
      }
  }
  const changeBookName = (e)=>{
    setName(e.target.value);
  }

  const changeGener = (e)=>{
    setGener(e.target.value);
  }
  
  const changeValue = (e)=>{
    setAuthorId(e.target.value);
  }
  const submit =(e) => {
    e.preventDefault();
    addBook();
  }

  return (
    <form onSubmit={submit}>
      <p>
        BookName: <input onChange={changeBookName}/>
      </p>
      <p>
         gener:  <input onChange={changeGener}/>
      </p>
      <p>
        author:
        <select onChange={changeValue}>
           <option value={1} >请选择</option>
          {displayAuthors()}
        </select>
      </p>
      <button type="submit">+</button>
    </form>
  );
}

export default AddBook;