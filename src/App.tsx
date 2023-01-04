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
        Convin Task
      </h1>
      <hr className="border-2 border-[#121629]" />
      <Users />
    </div>
  );
};

export default App;
