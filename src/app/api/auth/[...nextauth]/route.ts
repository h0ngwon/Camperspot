import { Tables } from '@/types/supabase';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { supabase } from '../../db';
import { SocialDataType } from '@/types/auth';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'text' },
        password: {
          type: 'password',
        },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error('입력 값이 잘못되었습니다.');
        }
        // supabase에서 데이터 가져와서 객체를 만든 후 return
        const companyUser = await supabase
          .from('company_user')
          .select('*')
          .eq('email', `${credentials?.email}`);

        const userData = companyUser.data?.[0];

        if (userData?.password !== credentials?.password) {
          throw new Error('비밀번호가 다릅니다.');
        }

        return {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          image: null,
        };
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
          const kakaoData: SocialDataType = {
            email: user.email as string,
            profile_url: user.image as string,
            nickname: user.name as string,
            provider: account.provider as string,
          };
          await supabase.from('user').insert<SocialDataType>(kakaoData);
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
          await supabase.from('user').insert<SocialDataType>(naverData);
        }
      }
      return token;
    },

    // 세션에 로그인한 유저 정보
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };
