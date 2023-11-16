import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiHeart, CiBookmark } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { TfiCommentsSmiley } from "react-icons/tfi";

interface PostProps {
  post: {
    id: string;
    username: string;
    avatar: string;
    image: string;
    caption: string;
    likes: number;
  };
}
const SinglePost = ({ post }: PostProps) => {
  const { id, username, avatar, image, caption, likes } = post;
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes);

  useEffect(() => {
    // Fetch the existing saved posts from local storage
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    if (!Array.isArray(savedPosts)) {
      console.error("Error parsing saved posts from local storage");
      return;
    }

    // Check if the post is already saved
    const isPostSaved = savedPosts.some((savedPost) => savedPost.id === id);

    // Set the initial state based on whether the post is saved
    setIsSaved(isPostSaved);
  }, [id]);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  // handle post save on saved
  const handleSave = (id: string) => {
    setIsSaved((prev) => !prev);

    // Fetching the existing saved posts from local storage
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    if (!Array.isArray(savedPosts)) {
      console.error("Error parsing saved posts from local storage");
      return;
    }

    // Check if the post is already saved
    const existingIndex = savedPosts.findIndex(
      (savedPost) => savedPost.id === id
    );

    // If the post is not saved, add it to the savedPosts array
    if (existingIndex === -1) {
      savedPosts.push(post);
      toast.success("Post saved!");
    } else {
      // If the post is already saved, remove it from the savedPosts array
      savedPosts.splice(existingIndex, 1);
      toast.success("Post Unsaved!");
    }

    // Save the updated savedPosts array to local storage
    localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
  };
  return (
    <div className="space-y-4">
      {/* name  */}
      <div className="flex gap-4 items-center">
        <img
          className="h-12 w-12 rounded-full border"
          src={avatar}
          alt="avatar"
        />
        <h2 className="font-semibold text-xl font-serif">{username}</h2>
      </div>
      {/* caption div  */}
      <h2 className="text-xl font-normal font-mono">{caption}</h2>
      {/* image div  */}
      <div>
        <img className="object-cover rounded-md" src={image} alt="" />
      </div>
      {/* like comment save  */}
      <div className="flex justify-between pb-6">
        <div className="flex gap-3 items-center">
          {/* love btn  */}
          <button title="Love" onClick={handleLike}>
            {isLiked ? (
              <FaHeart className="text-3xl text-red-500"></FaHeart>
            ) : (
              <CiHeart className="text-3xl"></CiHeart>
            )}
          </button>
          <p className="font-light text-base text-[#757575]">
            {likeCount > 0 ? likeCount : 0} People Love this post
          </p>

          {/* comment btn  */}
          <button title="Comment">
            <TfiCommentsSmiley className="text-3xl"></TfiCommentsSmiley>
          </button>
        </div>
        <div>
          {/* saved btn  */}
          <button
            title={isSaved ? "Unsave this post" : "Save this post"}
            onClick={() => handleSave(id)}
          >
            <CiBookmark
              className={`text-3xl ${
                isSaved ? "text-blue-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>
      </div>
      <hr className="border-2" />
    </div>
  );
};

export default SinglePost;
