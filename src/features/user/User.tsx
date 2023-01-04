import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { Mail } from "./Mail";
import { getUserAsync, selectUser } from "./userSlice";

export const User = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(selectUser);

  useEffect(() => {
    const getUser = async () => {
      await dispatch(getUserAsync(id));
    };
    getUser();
  }, [dispatch, id]);
  console.log(user);

  return (
    <div className="flex justify-center">
      <div className="flex-col mt-20 border-4 p-4 border-[#121629] bg-[#d4d8f0] text-black">
        <div className="flex justify-center">
          <img
            className="flex justify-center w-40 rounded-full"
            src={user.avatar}
            alt="User Avatar"
          />
        </div>
        <h1 className="flex justify-center text-2xl">
          {user.first_name}
          {"  "}
          {user.last_name}
        </h1>

        <h1 className="flex justify-center">
          <Mail />
          <a className="px-1" href={`mailto:${user.email}`}>
            {user.email}
          </a>
        </h1>
      </div>
    </div>
  );
};
