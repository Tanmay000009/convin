import { Users } from "./features/user/Users";

export const App = () => {
  return (
    <div className="App">
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Convin task
      </h1>
      <Users />
    </div>
  );
};

export default App;
