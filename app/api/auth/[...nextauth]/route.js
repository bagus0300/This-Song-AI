import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: [
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-top-read"
          ].join(" "),
          show_dialog: true
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // console.log("jwt token", token);
      // console.log("jwt account", account);
      // console.log("jwt profile", profile);
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      if (profile) {
        token.id = profile.id;
        token.images = profile.images;
        token.url = profile.external_urls.spotify;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session", session);
      // console.log("token", token);
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      // console.log("session", session);
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
