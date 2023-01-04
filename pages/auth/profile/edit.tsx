import Head from 'next/head';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';
import { MdPhone, MdLockOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';

const EditProfilePage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-gray-50 px-12 pb-32">
        <div className="flex items-center justify-between py-4  text-xl">
          <div className="flex items-center gap-2 text-xl">
            <FiArrowLeft />
            <h2>Edit Profile</h2>
          </div>
        </div>
        <div className="mt-4">
          <div className="mx-36 flex flex-col items-center gap-10 bg-white px-36 py-14">
            <div>
              <RxAvatar size={100} className="text-gray-400" />
            </div>
            <div className="flex w-full gap-16">
              <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                <FaRegUser />
                <input
                  type="text"
                  placeholder="First name"
                  className="flex-grow py-1 focus:outline-none"
                  value="Abebe"
                />
              </div>
              <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                <FaRegUser />
                <input
                  type="text"
                  placeholder="Last name"
                  className="flex-grow py-1 focus:outline-none"
                  value="Kebede"
                />
              </div>
            </div>
            <div className="flex w-full gap-16">
              <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                <MdPhone />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="flex-grow py-1 focus:outline-none"
                  value="0911121314"
                />
              </div>
              <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                <FiMail />
                <input
                  type="text"
                  placeholder="Email address"
                  className="flex-grow py-1 focus:outline-none"
                  value="abebe@gmail.com"
                />
              </div>
            </div>
            <div className="flex w-full gap-16">
              <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                <MdLockOutline />
                <input
                  type="password"
                  placeholder="**********"
                  className="flex-grow py-1 focus:outline-none"
                  value="password"
                />
              </div>
            </div>
            <button className="flex items-center gap-2 self-end rounded-md bg-blue-800 px-10 py-2 font-roboto-regular  text-white">
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
