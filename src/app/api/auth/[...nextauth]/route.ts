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
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'text' },
        password: {
          label: '비밀번호',
          type: 'password',
        },
      },

      async authorize(credentials, req) {
        const {email, password} = credentials
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
    // 로그인 시 토큰 발급
    async jwt({ token, user, account }) {
      if (account?.provider === 'kakao') {
        const { data, error } = await supabase
          .from('user')
          .select('*')
          .eq('email', `${user.email}`);

        if (error) {
          throw new Error(error.message);
        }

        if (!data.length) {
          const kakaoData: Omit<Tables<'user'>, 'id' | 'password'> = {
            email: user.email as string,
            profile_url: user.image as string,
            nickname: user.name as string,
            provider: account.provider as string,
          };
          await supabase
            .from('user')
            .insert<Omit<Tables<'user'>, 'id' | 'password'>>(kakaoData);
        }
      }
      if (account?.provider === 'naver') {
        const { data, error } = await supabase
          .from('user')
          .select('*')
          .eq('email', `${user.email}`);

        if (error) {
          throw new Error(error.message);
        }

        if (!data.length) {
          const naverData: Omit<Tables<'user'>, 'id' | 'password'> = {
            email: user.email as string,
            profile_url: user.image as string,
            nickname: user.name as string,
            provider: account.provider as string,
          };
          await supabase
            .from('user')
            .insert<Omit<Tables<'user'>, 'id' | 'password'>>(naverData);
        }
      }
      console.log('token = ', token);
      return token;
    },
    // 세션에 로그인한 유저 정보
    async session({ session }) {
      console.log('session = ', session);
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };
