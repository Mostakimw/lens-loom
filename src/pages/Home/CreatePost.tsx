import { useState } from "react";
import { useAuth, AuthContextProps } from "../../provider/AuthProvider";
import CreatePostModal from "./CreatePostModal";

const CreatePost = () => {
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);

  const { user }: AuthContextProps = useAuth();
  const userName = user?.user?.displayName;

  return (
    <>
      <div className="max-w-xl mx-auto">
        <div
          onClick={() => setOpenPostModal(true)}
          className="py-4 bg-base-100 rounded-xl"
        >
          <div className="flex items-center gap-3 p-1">
            {user?.user ? (
              <img
                className="w-10 h-10 object-cover rounded-full"
                src="https://gravatar.com/avatar/024a44b5f1958529a62a6cb731e5d29d?s=400&d=robohash&r=x"
                alt="User"
              />
            ) : (
              <img
                className="w-10 h-10 object-cover rounded-full"
                src="userpng"
                alt="User"
              />
            )}
            <div className="flex items-center  w-full">
              <div
                className="py-2 md:px-4 px-1 w-full cursor-pointer"
                style={{ borderBottom: "2px solid #999" }}
              >
                <p className="text-gray-400">{`What's on your mind, ${userName}?`}</p>
              </div>
            </div>
          </div>
        </div>
        {openPostModal && <div className="overlayCustom" />}
        {openPostModal && (
          <CreatePostModal
            setOpenPostModal={setOpenPostModal}
          ></CreatePostModal>
        )}
      </div>
    </>
  );
};

export default CreatePost;