import React from 'react';
import './App.css';
import { PostAbstract, PostAbstractProps, PostProps, PostComponent, PostListComponent } from './post';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';

function App() {
  const props: PostAbstractProps = { id: 0, title: "this is title", link_name: "this_is_link_name" };

  return (
    <div className="App">
      <div>
        <h1>Hello World</h1>
      </div>
      {/* <PostAbstract id={props.id} title={props.title} link_name={props.link_name} ></PostAbstract> */}
      <div>
        <a href="/post">posts</a>
      </div>
      <BrowserRouter>
        <Link to="/post"></Link>
        <Switch>
          <Route path="/post/:link_name" component={PostComponent}></Route>
          <Route path="/post" component={PostListComponent}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
