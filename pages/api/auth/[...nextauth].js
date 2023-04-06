import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
export default NextAuth({
  providers: [
    Providers.Google({
      clientId:
        '189759313604-enps8a5dfm56iouuf7g5rknclbl2h4si.apps.googleusercontent.com',
      clientSecret: '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',
      //callbackURL: 'https://liyumarket.com/auth/google/callback',
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
