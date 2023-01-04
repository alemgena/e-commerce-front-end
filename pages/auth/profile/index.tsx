import Head from 'next/head';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { RiPencilFill } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';
import { MdPhone, MdLockOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const router = useRouter();
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
            <h2>Profile</h2>
          </div>
          <button
            onClick={() => router.push('/auth/profile/edit')}
            className="flex items-center gap-2 rounded-full bg-blue-800 px-4 py-2 font-roboto-regular text-sm text-white"
          >
            <RiPencilFill />
            <p>Edit</p>
          </button>
        </div>
        <div className="mt-4">
          <div className="mx-36 flex flex-col items-center gap-10 bg-white px-36 py-14">
            <div>
              <RxAvatar size={100} className="text-gray-400" />
            </div>
            <div className="flex w-full gap-16">
              <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                <FaRegUser />
                <p>Abebe</p>
              </div>
              <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                <FaRegUser />
                <p>Kebede</p>
              </div>
            </div>
            <div className="flex w-full gap-16">
              <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                <MdPhone />
                <p>0911121314</p>
              </div>
              <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                <FiMail />
                <p>abebe@gmail.com</p>
              </div>
            </div>
            <div className="flex w-full gap-16">
              <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                <MdLockOutline />
                <p>**********</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
