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

  return (
    <div>
      {activeUserId ? <User id={activeUserId} /> : null}
      <ul>
        {users.users.map((id) => (
          <li key={id} onClick={() => setActiveUserId(id)}>
            {id}
          </li>
        ))}
      </ul>
    </div>
  );
};
