import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
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
    <div>
      <h1>{user.first_name}</h1>
      <h1>{user.last_name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.avatar}</h1>
    </div>
  );
};
