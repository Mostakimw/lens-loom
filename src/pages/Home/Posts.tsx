import { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import CreatePost from "./CreatePost";

export interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
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

  const handlePostSubmit = (newPost: Post) => {
    // Update the state with the new post
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <>
      <CreatePost onPostSubmit={handlePostSubmit} />
      <div className="max-w-xl mx-auto my-10 space-y-4 px-2 md:px-0">
        {posts.map((post) => (
          <SinglePost key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Posts;
