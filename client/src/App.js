import React from "react";
import PostCreat from "./PostCreat";
import PostList from "./PostList";

const App = () => {
    return (
        <div className="container">
            <h1>Creat Post</h1>
            <PostCreat />
            <hr />
            <h1>PostList</h1>
            <PostList />
        </div>
    )

};

export default App;