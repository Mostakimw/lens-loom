// import { useState } from "react";
import { CiHeart } from "react-icons/ci";
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
const SingleSavedPost = ({ post }: PostProps) => {
  const { id, username, avatar, image, caption, likes } = post;

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
          <button title="Love">
            <CiHeart className="text-3xl"></CiHeart>
          </button>
          <p className="font-light text-base text-[#757575]">
            {likes > 0 ? likes : 0} People Love this post
          </p>
          <button title="Comment">
            <TfiCommentsSmiley className="text-3xl"></TfiCommentsSmiley>
          </button>
        </div>
      </div>
      <hr className="border-2" />
    </div>
  );
};

export default SingleSavedPost;
