import { useCallback } from "react";
import { useUserStore } from "../../zustand/userStore";
import { IUser } from "../../entites";

export const useUserState = () => {
	const user = useUserStore((state) => state.user);
	const rawSetUser = useUserStore((state) => state.setUser);
  const rawClearUser = useUserStore((state) => state.clearUser);
  const isLoadingUser = useUserStore((state) => state.isLoadingUser)
  const _setLoadingUser = useUserStore((state) => state._setLoadingUser)

	const setUser = useCallback(
		(user: IUser) =>
			rawSetUser(user),
		[rawSetUser]
  );
  
  const clearUser = useCallback(() => rawClearUser(), [rawClearUser])

  return {
    user,
    isLoadingUser,
    setUser,
    clearUser,
    _setLoadingUser
  }

};
