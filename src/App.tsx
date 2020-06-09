import React from 'react';
import './App.css';
import { PostProps, PostComponent } from './post';

function App() {
  const props: PostProps = { id: 0, title: "title", link_name: "link_name", content: undefined };

  return (
    <div className="App">
      <PostComponent id={props.id} title={props.title} link_name={props.link_name} ></PostComponent>
    </div>
  );
}

export default App;
