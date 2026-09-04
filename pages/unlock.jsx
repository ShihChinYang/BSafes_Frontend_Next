import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import UnlockPage from '../components/twinPaper/account/UnlockPage';

const isTwinPaper =
  !!process.env.NEXT_PUBLIC_isTwinPaper && process.env.NEXT_PUBLIC_isTwinPaper !== 'false';

export default function Unlock() {
  const router = useRouter();

  useEffect(() => {
    if (!isTwinPaper) router.replace('/logIn');
  }, []);

  if (!isTwinPaper) return null;

  return (
    <>
      <Head>
        <title>Unlock Twin Paper</title>
      </Head>
      <UnlockPage />
    </>
  );
}
