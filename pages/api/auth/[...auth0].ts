import { handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";
import { AfterCallback } from "@auth0/nextjs-auth0/dist/auth0-session";

const afterCallback: AfterCallback = (req, res, session)  => {
    if(!session.user) {
      throw new Error("User is not logged in");
    } 
    return session
}

export default handleAuth({
    async login(req, res) {
      await handleLogin(req, res, {
        returnTo: "/dashboard",
      });
    },
    async callback(req, res) {
      try {
        await handleCallback(req, res, { 
          afterCallback,
          // redirectUri: `${process.env.AUTH0_BASE_URL}/dashboard`
        });
      } catch (error) {
        res.status(error.status || 500).end(error.message);
      }
    }
});