import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CreatePage from '../components/twinPaper/account/CreatePage';

const isTwinPaper =
  !!process.env.NEXT_PUBLIC_isTwinPaper && process.env.NEXT_PUBLIC_isTwinPaper !== 'false';

export default function Create() {
  const router = useRouter();

  useEffect(() => {
    if (!isTwinPaper) router.replace('/getStarted');
  }, []);

  if (!isTwinPaper) return null;

  return (
    <>
      <Head>
        <title>Create a Twin Paper Account</title>
      </Head>
      <CreatePage />
    </>
  );
}
