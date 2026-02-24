/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  AuthState,
  logoutUser,
  setAccessToken,
  setLoggingOut,
  setRefreshToken,
} from "@/redux/store/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMutationService } from "./useMutationService";
import { authServices } from "@/services/auth.service";
import { AuthRoutes } from "@/routes/auth.routes";
import { sessionEventEmitter } from "../eventEmitters";
import { appendQueryParams } from "../helpers";
import { clearAuthCookies, redirectToAuthRoute } from "../helper";


const useAuthSession = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { accessToken, refreshToken, user }: any = useAppSelector<AuthState>(
    ({ auth }) => ({
      ...auth,
    })
  );

  const pathname = usePathname();

  const { mutateAsync: refreshAuthToken, isPending: isLoading } =
    useMutationService({
      service: {
        ...authServices.refreshToken,
      },
    });

  const logout = async () => {
    dispatch(logoutUser());
    clearAuthCookies();
    if (redirectToAuthRoute(AuthRoutes.selectRole)) {
      setTimeout(() => dispatch(setLoggingOut(false)), 1000);
      return;
    }
    router.replace(AuthRoutes.selectRole);
    setTimeout(() => dispatch(setLoggingOut(false)), 1000);
  };

  // const handleLogout = () => {
  //   if (
  //     [
  //       AuthRoutes.login,
  //       AuthRoutes.forgotPassword,
  //       AuthRoutes.resetPassword,
  //       AuthRoutes.createNewPassword,
  //     ].includes(pathname as AuthRoutes)
  //   ) {
  //     return;
  //   } else {
  //     logout();
  //   }
  // };

  async function handleRefresh() {
    if (isLoading) return;

    try {
      const { data: refreshTokenResponse }: any = await refreshAuthToken({
        refreshToken: refreshToken.token,
      });

      dispatch(
        setAccessToken({
          token: refreshTokenResponse?.accessToken,
          _time_stamp: new Date().toISOString(),
        })
      );
      dispatch(
        setRefreshToken({
          token: refreshTokenResponse?.refreshToken,
          _time_stamp: new Date().toISOString(),
        })
      );
      localStorage.setItem("accessToken", refreshTokenResponse?.accessToken);
      localStorage.setItem("refreshToken", refreshTokenResponse?.refreshToken);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (exp) {
      // Don't redirect when user is on login page (e.g. wrong password / invalid credentials)
      const isAuthAttemptPage = [
        AuthRoutes.login,
        AuthRoutes.forgotPassword,
        AuthRoutes.resetPassword,
        AuthRoutes.createNewPassword,
        AuthRoutes.verifyToken,
        AuthRoutes.verifyEmail,
      ].includes(pathname as AuthRoutes);
      if (!isAuthAttemptPage) {
        await logout();
      }
    }
  }

  useEffect(() => {
    if (
      !refreshToken ||
      ![
        "/",
        AuthRoutes.selectRole,
        // AuthRoutes.role,
        AuthRoutes.login,
        AuthRoutes.forgotPassword,
        AuthRoutes.resetPassword,
        AuthRoutes.createNewPassword,
      ].includes(pathname)
    ) {
      sessionEventEmitter.removeListener("unauthorized", handleRefresh);

      sessionEventEmitter.addListener("unauthorized", handleRefresh);

      return () => {
        sessionEventEmitter.removeListener("unauthorized", handleRefresh);
      };
    }
  }, [refreshToken, pathname]);

  return {
    logout,
  };
};

export default useAuthSession;
