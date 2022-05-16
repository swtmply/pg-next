import type { IronSessionOptions } from "iron-session";
import { User } from "./interfaces";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRETCOOKIEPASSWORD as string,
  cookieName: "iron-session/user-cookie",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
