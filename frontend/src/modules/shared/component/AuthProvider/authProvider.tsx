"use client";

import { FC, useEffect } from "react";
// import { socket } from "@/lib/socket";
import useAuthSession from "@/utils/hooks/useAuthSession";
import { useAppSelector } from "@/redux/store/hooks";
import { AuthState } from "@/redux/store/slices/authSlice";

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  useAuthSession();

  const { accessToken } = useAppSelector<AuthState>(({ auth }) => ({
    ...auth,
  }));

  useEffect(() => {
    const token = accessToken?.token;
    console.log("AuthProvider: Access token changed, updating socket auth", { token });
    // if (!token) {
    //   socket.disconnect();
    //   return;
    // }

    // socket.auth = { token };

    // if (socket.connected) {
    //   socket.disconnect();
    // }

    // socket.connect();
    console.log("Conected to socket with new token");
  }, [accessToken?.token]);

  return <>{children}</>;
};

export default AuthProvider;
