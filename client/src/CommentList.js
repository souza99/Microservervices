import React, { useEffect, useState } from "react";
import axios from "axios";

export default ( {postId} ) => {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        console.log("Opa: ", postId);
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        
        setComments(res.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const renderedComments = comments.map(comments => {
        return <li key={comments.id}>{comments.content}</li>
    });

    return <ul>{renderedComments}</ul>
}
