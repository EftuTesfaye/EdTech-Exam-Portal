import { Navigate } from "react-router-dom";

type RouteGuardProp = {
  children: JSX.Element;
};
function getSystemAdminAuthenticatedUser() {
  let user = localStorage.getItem("coydoeAdminUser");
  if (user) return JSON.parse(user);
  return null;
}
export function SystemAdminRouteGuard({ children }: RouteGuardProp) {
  const isLoggedIn = getSystemAdminAuthenticatedUser() ? true : false;
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to={"/admin-login"} replace />;
  }
}
