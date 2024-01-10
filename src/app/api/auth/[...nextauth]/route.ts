import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import { supabase } from '../../db';
import { Tables } from '@/types/supabase';

const handler = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: '이메일', type: 'text', placeholder: '이메일 입력' },
        password: {
          label: '비밀번호',
          type: 'password',
          placeholder: '비밀번호 입력',
        },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'kakao') {
        const { data, error } = await supabase
          .from('user')
          .select('*')
          .eq('email', `${user.email}`);
          
        if (error) {
          throw new Error(error.message);
        }

        if (data?.length === 0) {
          const kakaoData: Omit<Tables<'user'>, 'id' | 'password'> = {
            email: user.email as string,
            profile_url: user.image as string,
            nickname: user.name as string,
          };
          await supabase
            .from('user')
            .insert<Omit<Tables<'user'>, 'id' | 'password'>>(kakaoData);
        }
      }
      return true;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
