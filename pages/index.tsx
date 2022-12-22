import Head from 'next/head';

export default function Index() {
  return (
    <div className="flex min-h-[20rem] flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">
          <p className="text-blue-600">
            Ecommerce Frontend application starter
          </p>
        </h1>
      </div>
    </div>
  );
}
