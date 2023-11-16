import Posts from "./Posts";

const Home = () => {
  return (
    <>
      {/* navbar  */}
      <div className="flex justify-between max-w-xl mx-auto my-5">
        <h1>Lens Loom</h1>
        <p>Saved</p>
        <p>UserName</p>
      </div>
      {/* other component  */}
      <div>
        <Posts />
      </div>
    </>
  );
};

export default Home;
