import React, { useEffect, useState, Suspense } from 'react';
import styled from 'styled-components';
import Loader from './components/Loader';
import './App.css';

const List = React.lazy(()=> {
  return fetch(`https://jsonplaceholder.typicode.com/posts?_start=${0}&_limit=${10}`)
  .then(response => response.json())
  .then(data => {
      if(data.length > 0) return import('./components/List')
   });
});

function App() {
  const [listItems, setListItems] = useState([]);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const Title = styled.h1`
    color: #65d9ff;
    filter: drop-shadow(2px 4px 6px lightblue);
    margin: 0;
  `;

  const PageSelectors = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row;
  `

  const PageButton = styled.div`
    opacity: ${ props => props.disabled ? ".5" : "1"};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 8rem;
    margin-left: 1rem;
    cursor: pointer;
    background-color: lightgray;
  `;

  useEffect(()=>{
      setLoading(true)
      fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
      .then(response => response.json())
      .then(data => {
          setListItems(data);
          setLoading(false);
       });
  }, [start, limit]);

  const nextPage = () => {
    if (listItems.length === 0 || loading) return;
    setStart(start+limit);
  }

  const previousPage = () => {
    if (start === 0 || loading) return;
    setStart(start-limit);
  }

  return (
    <div className="App">

      <Title>Public API Paginated List</Title>

      <div className="ListContainer">
        <Suspense fallback={<Loader />}>
          { loading && (
            <Loader />
          ) || (
            <List listItems={listItems} />
          )}
        </Suspense>
      </div>

      <PageSelectors>
          <PageButton onClick={()=>{ previousPage() }} disabled={ start === 0 || loading ? true : false }>
            <p>Previous Page</p>
          </PageButton>
          <PageButton onClick={()=>{ nextPage() }} disabled={ listItems.length === 0 || loading }>
            <p>Next Page</p>
          </PageButton>
      </PageSelectors>
    </div>
  );
}

export default App;
