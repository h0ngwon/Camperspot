'use client';

import AuthSession from './AuthSession';
import QueryProvider from './QueryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

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
