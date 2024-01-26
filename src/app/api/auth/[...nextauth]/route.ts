import { SocialDataType } from '@/types/auth';
import bcrypt from 'bcrypt';
import { Account, NextAuthOptions, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { supabase } from '../../db';

const authOptions: NextAuthOptions = {
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
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('입력 값이 잘못되었습니다.');
        }
        // supabase에서 데이터 가져와서 객체를 만든 후 return
        const { password } = credentials;
        const companyUser = await supabase
          .from('company_user')
          .select('id, email, name, password, role')
          .eq('email', `${credentials?.email}`)
          .single();

        const userData = companyUser.data;

        if (userData) {
          const result = await bcrypt.compareSync(
            password,
            userData?.password as string,
          );
          if (!result) {
            return null;
          }
        }
        return userData;
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // 로그인 시 토큰 발급
    async jwt({ token, user, account }) {
      if (account?.provider === 'kakao') {
        return await makeSocialAccount(user, account, 'kakao', token);
      }

      if (account?.provider === 'naver') {
        return await makeSocialAccount(user, account, 'naver', token);
      }

      if (account?.provider === 'credentials') {
        token.role = 'company';
      }

      return token;
    },

    // 세션에 로그인한 유저 정보
    async session({ session, token }) {
      if (token.role === 'user') {
        const repData = (
          await supabase
            .from('user')
            .select('*')
            .eq('email', `${session.user?.email}`)
            .single()
        ).data;
        const userSessionData = {
          id: repData?.id,
          role: repData?.role,
          provider: repData?.provider,
        };
        session.user = { ...session.user, ...userSessionData };
      } else if (token.role === 'company') {
        const repData = (
          await supabase
            .from('company_user')
            .select('*')
            .eq('email', `${session.user?.email}`)
            .single()
        ).data;
        const userSessionData = {
          id: repData?.id,
          role: repData?.role,
        };
        session.user = { ...session.user, ...userSessionData };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const makeSocialAccount = async (
  user: User,
  account: Account,
  provider: string,
  token: JWT,
) => {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('email', `${user.email}`);

  if (error) {
    throw new Error(error.message);
  }

  if (!data.length) {
    const socialData: Omit<SocialDataType, 'id'> = {
      email: user.email as string,
      profile_url: user.image as string,
      nickname: user.name as string,
      provider: account.provider as string,
      role: 'user',
    };

    const { error } = await supabase
      .from('user')
      .insert<Omit<SocialDataType, 'id'>>(socialData);
    console.log(error);
  }
  token.id = user.id;
  token.role = 'user';
  return token;
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
