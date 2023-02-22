import { FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import Head from 'next/head';
import axios from 'axios';
import { Ur2 } from '@/utils/url';
import Notify from '@/components/Ui/Notify';
import Notification from '@/components/Ui/Notification';
type changePassword = {
  message: string;
  newPassword: string;
  oldPassword: string;
};
function ChangePasswordPage() {
  const { NotifyMessage, notify, setNotify } = Notify();
  const [loading, setLoading] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password3, setPassword3] = useState('');
  const [password1Err, setPassword1Err] = useState('');
  const [password2Err, setPassword2Err] = useState('');
  const [password3Err, setPassword3Err] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPassword1Err('');
    setPassword2Err('');
    setPassword3Err('');
    if (password1.length < 6) {
      setPassword1Err('Current password should be atleast 6 characters !');
      return;
    }
    if (password2.length < 6) {
      setPassword2Err('New Password should be atleast 6 characters !');
      return;
    }
    if (password3.length < 6) {
      setPassword3Err('New Password should be atleast 6 characters !');
      return;
    }
    if (password2 !== password3) {
      setPassword3Err('Passwords should match !');
      return;
    }
    if (!password2.match(/\d/) || !password2.match(/[a-zA-Z]/)) {
      setPassword2Err(
        'Password must contain at least one letter and one number'
      );
      return;
    }
    let token = localStorage.getItem('token');
    setLoading(true);
    try {
      const { data } = await axios.patch<changePassword>(
        `${Ur2}api/users/changePassword`,
        {
          newPassword: password2,
          oldPassword: password1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(data){
         setLoading(false);
         NotifyMessage({
           message: data.message,
           type: 'success',
         });
      }
    } catch (error: any) {
      console.log(error.response.data)
      NotifyMessage({
        message: error.response.data.error.message,
        type: 'error',
      });
      setLoading(false);
    }
  };
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
        <Notification notify={notify} setNotify={setNotify} />
        <div className="mt-4">
          <div className="mx-36 flex flex-col items-center gap-10 bg-white px-36 py-14">
            <div>
              <RxAvatar size={100} className="text-gray-400" />
            </div>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="mt-4 space-y-4 md:space-y-5 lg:mt-5"
              action="#"
            >
              <div>
                <label
                  htmlFor="password1"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Current Password
                </label>
                <input
                  type="password"
                  id="password1"
                  value={password1}
                  onChange={(e) => {
                    setPassword1(e.target.value);
                  }}
                  placeholder="Current Password"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
                <div className="text-red-600">{password1Err}</div>
              </div>
              <div>
                <label
                  htmlFor="password2"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password2"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                  placeholder="New Password"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
                <div className="text-red-600">{password2Err}</div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  value={password3}
                  onChange={(e) => {
                    setPassword3(e.target.value);
                  }}
                  id="confirm-password"
                  placeholder="Confirm password"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
                <div className="text-red-600">{password3Err}</div>
              </div>

              <div className=" flex w-full gap-16">
                {loading ? (
                  <button
                    disabled
                    className="flex items-center gap-2 self-end rounded-md bg-blue-800 px-10 py-2 font-roboto-regular  text-white"
                  >
                    Updateing Password ...
                  </button>
                ) : (
                  <button className="flex items-center gap-2 self-end rounded-md bg-blue-800 px-10 py-2 font-roboto-regular  text-white">
                    Update Password
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePasswordPage;
