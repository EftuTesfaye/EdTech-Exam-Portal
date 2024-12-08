import { Navigate } from "react-router-dom";

type RouteGuardProp = {
  children: JSX.Element;
};
function getPublicAuthenticatedUser() {
  let user = localStorage.getItem("coydoePublicUser");
  if (user) return JSON.parse(user);
  return null;
}
export function ClerkRouteGuard({ children }: RouteGuardProp) {
  const isLoggedIn = getPublicAuthenticatedUser() ? true : false;
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to={"/"} replace />;
  }
}
