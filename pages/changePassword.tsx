import { FaRegUser } from 'react-icons/fa';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { MdLockOutline, MdPhone } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import Head from 'next/head';
import { useRouter } from 'next/router';

function ChangePasswordPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>change Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-gray-50 px-12 pb-32">
        <div className="flex items-center justify-between py-4  text-xl">
          <div className="flex items-center gap-2 text-xl">
            <FiArrowLeft />
            <h2>Change Password</h2>
          </div>
        </div>
        <div className="mt-4">
          <div className="mx-36 flex flex-col items-center gap-10 bg-white px-36 py-14">
            <div>
              <RxAvatar size={100} className="text-gray-400" />
            </div>
            <form className="mt-4 space-y-4 md:space-y-5 lg:mt-5" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your old Password
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className=" flex w-full gap-16">
                <button className="flex items-center gap-2 self-end rounded-md bg-blue-800 px-10 py-2 font-roboto-regular  text-white">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePasswordPage;
