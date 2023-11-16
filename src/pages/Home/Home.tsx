import Posts from "./Posts";
import { AuthContextProps } from "../../provider/AuthProvider";
import { FaArrowCircleDown, FaSignOutAlt } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { user, logoutUser }: AuthContextProps = useAuth();

  // ! logout user handler
  const signoutUser = () => {
    logoutUser();
  };

  return (
    <>
      {/* navbar  */}
      <div className="flex justify-between items-center max-w-xl mx-auto my-5 px-2 md:px-0">
        <h1>Lens Loom</h1>
        <Link to="/saved">
          <button className="btn btn-primary">
            Saved <CiBookmark className="text-xl"></CiBookmark>
          </button>
        </Link>
        <div className="text-gray-300">
          <div>
            {/* showing user name as link and when click the link then signout button appear  */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="text-gray-800 bg-gray-100 border border-blue-500 px-3 py-3 hover:cursor-pointer rounded-full transition-all duration-300"
                >
                  {user?.displayName}{" "}
                  <FaArrowCircleDown className="inline-block" />
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content p-2 shadow bg-base-100 rounded-box text-gray-800 w-40 mt-4"
                >
                  <li>
                    <button onClick={signoutUser}>
                      Sign Out <FaSignOutAlt />
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* other component  */}
      <div>
        <Posts />
      </div>
    </>
  );
};

export default Home;
