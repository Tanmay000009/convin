import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { User } from "./User";
import { getUsersAsync, selectUsers } from "./userSlice";

export const Users = () => {
  const dispatch = useAppDispatch();
  const users = useSelector(selectUsers);

  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  // get users using dispatch
  useEffect(() => {
    const getUsers = async () => {
      await dispatch(getUsersAsync());
    };
    getUsers();
  }, [dispatch]);

  const textStyle = " px-3 py-1 sm:px-4 sm:py-2 rounded-full cursor-pointer";

  return (
    <div className="flex-col justify-center">
      {activeUserId ? <User id={activeUserId} /> : <User id={users.users[0]} />}
      <div className="flex justify-around mt-20 text-[#232946] ">
        <p className={"bg-[#fffffe]" + textStyle + " cursor-not-allowed	"}>
          {"<"}
        </p>
        {users.users.map((id) => (
          <p
            key={id}
            onClick={() => setActiveUserId(id)}
            className={"bg-[#eebbc3]" + textStyle}
          >
            {id}
          </p>
        ))}
        <p className={"bg-[#fffffe]" + textStyle}>{">"}</p>
      </div>
    </div>
  );
};
