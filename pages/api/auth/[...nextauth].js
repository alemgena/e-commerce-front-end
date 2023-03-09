import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
//566882002764-cf590gpslmng2ek8uuptsibof2q12qja.apps.googleusercontent.com
export default NextAuth({
  providers: [
    Providers.Google({
      clientId:
        '566882002764-cf590gpslmng2ek8uuptsibof2q12qja.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, user) {
      session.accessToken = user.accessToken;
      return session;
    },
  },
});
