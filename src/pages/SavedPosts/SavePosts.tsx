import { useState, useEffect } from "react";
import SingleSavedPost from "./SingleSavedPost";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// type
export interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
}

//code
const SavePosts = () => {
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  //   getting saved posts from local storage
  const updateSavedPosts = () => {
    const savedPostsData = JSON.parse(
      localStorage.getItem("savedPosts") || "[]"
    );
    setSavedPosts(savedPostsData);
  };

  useEffect(() => {
    updateSavedPosts();
  }, []);

  //   delete saved posts
  const handleDeleteSavedPosts = () => {
    localStorage.removeItem("savedPosts");
    toast("Deleted!", {
      icon: "❎",
    });
    updateSavedPosts();
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-xl mx-auto my-10 space-y-4 px-2 md:px-0">
        <h1 className="font-mono font-italic font-bold text-2xl mb-3 text-purple-500 text-center">
          My Saved Posts
        </h1>
        {/* saved posts rendered here  */}
        {savedPosts.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-center text-gray-500">No saved posts yet.</p>
            <Link to="/" className="btn btn-link">
              Back to Home
            </Link>
          </div>
        ) : (
          savedPosts.map((post) => (
            <SingleSavedPost key={post.id} post={post} />
          ))
        )}

        {/* delete saved posts  */}
        {savedPosts.length > 0 && (
          <div className="flex justify-center pt-3">
            <button className="btn btn-error" onClick={handleDeleteSavedPosts}>
              Delete All Saved Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavePosts;
