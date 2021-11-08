import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

const afterCallback = (req, res, session, state) => {
    if(session.user) {
        res.writeHead(302, {
            Location: `${process.env.AUTH0_BASE_URL}/dashboard`,
        })
        res.end()
    } else {
        return session;
    }
}

export default handleAuth({
    async callback(req, res) {
        try {
          await handleCallback(req, res, { afterCallback });
        } catch (error) {
          res.status(error.status || 500).end(error.message);
        }
      }
});