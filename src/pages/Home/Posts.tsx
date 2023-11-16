import { useState, useEffect } from "react";
import SinglePost from "./SinglePost";

interface Post {
  id: number;
  username: string;
  avatar: string;
  image: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("posts.json");
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.log("error getting posts data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-xl mx-auto my-10 space-y-4">
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
