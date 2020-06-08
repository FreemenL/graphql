import React from 'react';
import { useQuery  } from '@apollo/react-hooks';
import { GET_BOOKS } from '../querys/index';

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {data.books.map((item,index)=>(
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export default BookList;