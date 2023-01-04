import { Users } from "./features/user/Users";

export const App = () => {
  return (
    <div className="App bg-[#232946] min-h-screen min-w-screen text-white">
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className="p-4 text-6xl text-[#b8c1ec]"
      >
        Convin task
      </h1>
      <Users />
    </div>
  );
};

export default App;
