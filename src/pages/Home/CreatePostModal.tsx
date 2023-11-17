import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FcGallery } from "react-icons/fc";
import { AuthContextProps } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../hooks/useAuth";
import { Post } from "./Posts";

// type
interface CreatePostModalProps {
  setOpenPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  onPostSubmit: (postData: Post) => void;
}

// code
const CreatePostModal: React.FC<CreatePostModalProps> = ({
  setOpenPostModal,
  onPostSubmit,
}) => {
  const { user }: AuthContextProps = useAuth();
  // for image file
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // handle upload image
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  // time stamp
  const convertTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString();
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const status = form.status.value;

    // image host using imgbb
    try {
      setLoading(true);
      const formData = new FormData();
      const file = fileInputRef.current?.files?.[0];
      formData.append("image", file || "");
      const url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      const imageUrl = result?.data?.display_url;
      console.log(imageUrl);

      // save new posts
      const postData = {
        id: uuidv4(),
        avatar:
          "https://gravatar.com/avatar/f5f3109fdd0b88ae9301bc13d64ceea8?s=400&d=robohash&r=x",
        image: imageUrl,
        username: user?.displayName ?? "",
        email: user?.email,
        caption: status,
        timestamp: convertTimestamp(new Date()),
        likes: 0,
        comment: [],
      };

      onPostSubmit(postData);
      form.reset();
      toast.success("Post Done");
      setOpenPostModal(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error posting");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-70"></div>
        <div className="bg-white p-6 w-1/3 rounded-lg shadow-md relative">
          {/* form start  */}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center my-3 justify-around">
              <h1 className="text-center text-2xl font-semibold">
                Make a Post
              </h1>
              <button
                onClick={() => setOpenPostModal(false)}
                className="bg-base-200 rounded-full p-3 text-2xl text-start"
              >
                <IoClose />
              </button>
            </div>
            <hr />

            {/* image and text area  */}
            <div className="space-y-4">
              <label
                className="input border-gray-300 border-2 flex items-center justify-between text-xl text-gray-400 cursor-pointer mt-3 px-3 py-2"
                onClick={() => fileInputRef.current?.click()}
                aria-required
              >
                <h1 className="text-xl ">
                  {selectedFile ? selectedFile.name : "Add image"}
                </h1>
                <FcGallery className="text-2xl" />
              </label>
              <textarea
                name="status"
                className="textarea text-2xl w-full h-40 input-bordered resize-none"
                placeholder={`Write Caption`}
              ></textarea>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              required
            />

            <button
              type="submit"
              className="btn bg-[#3b82f6] py-2 text-white text-xl w-full mt-3"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePostModal;
