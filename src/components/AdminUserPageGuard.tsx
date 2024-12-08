import { Navigate } from "react-router-dom";

type RouteGuardProp = {
  children: JSX.Element;
};
function getClerkUser() {
  let user = localStorage.getItem("coydoeClerkUser");
  if (user) return JSON.parse(user);
  return null;
}
export function AdminUserRouteGuard({ children }: RouteGuardProp) {
  const isLoggedIn = getClerkUser() ? true : false;
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to={"/clerk-auth"} replace />;
  }
}
