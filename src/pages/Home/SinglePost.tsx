// import { FaHeart } from "react-icons/fa";
import { CiHeart, CiBookmark } from "react-icons/ci";
import { TfiCommentsSmiley } from "react-icons/tfi";

interface PostProps {
  post: {
    username: string;
    avatar: string;
    image: string;
  };
}
const SinglePost = ({ post }: PostProps) => {
  const { username, avatar, image } = post;
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
      {/* image div  */}
      <div>
        <img className="object-cover rounded-md" src={image} alt="" />
      </div>
      {/* like comment save  */}
      <div className="flex justify-between pb-6">
        <div className="flex gap-3 items-center">
          <button>
            <CiHeart className="text-3xl"></CiHeart>
          </button>
          <button>
            <TfiCommentsSmiley className="text-3xl"></TfiCommentsSmiley>
          </button>
        </div>
        <div>
          <button>
            <CiBookmark className="text-3xl"></CiBookmark>
          </button>
        </div>
      </div>
      <hr className="border-2" />
    </div>
  );
};

export default SinglePost;
