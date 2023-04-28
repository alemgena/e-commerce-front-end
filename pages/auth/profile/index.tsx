import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { RiPencilFill } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';
import { MdPhone, MdLockOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { GET_USER } from '@/types';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import PageSpinner from '@/components/Ui/PageSpinner';
import { baseURL } from '@/config';
import { useAppSelector } from '@/store';
import { selectCurrentUser } from '@/store/auth';
import Protected from '@/components/protected/protected';
const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootStateOrAny) => state.login.loggedUser
  );
  const { user, token } = useAppSelector(selectCurrentUser);
  const User = useSelector((state: RootStateOrAny) => state.user.user);
  const { isLoading, error } = useSelector(
    (state: RootStateOrAny) => state.user
  );
  useEffect(() => {
    if (!!user && token) {
      let token = localStorage.getItem('token');
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let id = user.user ? user.user._id : user._id;
      dispatch({ type: GET_USER, id: id, config: config });
    }
  }, [user]);
  const router = useRouter();
  return (
    <Protected>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <div className="bg-gray-50 px-6 pb-32 sm:px-12">
          {User.data && (
            <>
              <div className="flex flex-col items-center justify-between py-4 text-xl sm:flex-row">
                <div
                  onClick={() => router.push('/')}
                  className="flex items-center gap-2 text-xl hover:cursor-pointer"
                >
                  <FiArrowLeft />
                  <h2>Profile</h2>
                </div>
                <button
                  onClick={() => router.push('/auth/profile/edit')}
                  className="font-roboto-regular flex items-center gap-2 rounded-full bg-blue-800 px-4 py-2 text-sm text-white"
                >
                  <RiPencilFill />
                  <p>Edit</p>
                </button>
              </div>
              <div className="mt-4">
                <div className="mx-auto flex flex-col items-center gap-10 bg-white px-8 py-14 sm:mx-36 sm:px-36">
                  <div>
                    {User.data.imageURL ? (
                      <img
                        src={`${baseURL}/${User.data.imageURL}`}
                        width="100px"
                        height="100px"
                        alt=""
                      />
                    ) : (
                      <RxAvatar size={100} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex w-full flex-col gap-16 sm:flex-row">
                    <div className="font-roboto-regular flex w-full items-center gap-4 border-b py-1 sm:w-1/2">
                      <FaRegUser />
                      <p>{User.data.first_name}</p>
                    </div>
                    <div className="font-roboto-regular flex w-full items-center gap-4 border-b py-1 sm:w-1/2">
                      <FaRegUser />
                      <p>{User.data.last_name}</p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-16 sm:flex-row">
                    <div className="font-roboto-regular flex w-full items-center gap-4 border-b py-1 sm:w-1/2">
                      <MdPhone />
                      <p>{User.data.phone}</p>
                    </div>
                    <div className="font-roboto-regular flex w-full items-center gap-4 border-b py-1 sm:w-1/2">
                      <FiMail />
                      <p>{User.data.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Protected>
  );
};

export default ProfilePage;
