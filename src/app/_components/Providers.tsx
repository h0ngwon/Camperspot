'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import AuthSession from './AuthSession';
import QueryProvider from './QueryProvider';

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  return (
    <AuthSession>
      <QueryProvider>{children}</QueryProvider>
      <ToastContainer />
    </AuthSession>
  );
}
