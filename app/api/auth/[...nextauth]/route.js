import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
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
  // session: {
  //   strategy: "jwt"
  // },
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("JWT callback");
      console.log("jwt token", token);
      console.log("jwt account", account);
      console.log("jwt profile", profile);

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

      console.log("token.expiresAt", token.expiresAt);
      console.log("Current date", Date.now());
      if (Date.now() < token.expiresAt * 1000) {
        console.log("Token is valid");
        console.log("jwt token (modified)", token);
        return token;
      } else if (token.refreshToken) {
        console.log("Token is invalid");
        console.log("token.refreshToken", token.refreshToken);
        try {
          const url = `https://accounts.spotify.com/api/token`;
          const data = {
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET
          };
          const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams(data),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          });
          const json = await response.json();
          console.log("json", json);

          if (!response.ok) {
            throw new Error(json.message);
          }

          token.accessToken = json.access_token;
          token.expiresAt = Math.floor(Date.now() / 1000 + json.expires_in);

          console.log("Token has been refreshed!");
          console.log("token", token);

          return token;
        } catch (error) {
          console.log(error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }) {
      console.log("Session callback");
      console.log("session", session);
      console.log("token", token);

      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      session.error = token.error;
      console.log("session", session);
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
