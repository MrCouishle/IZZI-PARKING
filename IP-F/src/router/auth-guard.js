import { current_user } from "@/global";
const isAuthenticatedGuard = async (to, from, next) => {
  return new Promise(() => {
    if (["ADMIN", "SP"].includes(current_user.level_user)) {
      return next();
    } else {
      next({ path: "/home" });
    }
  });
};
export default isAuthenticatedGuard;
