import Head from 'next/head';
import React,{useEffect,useState} from 'react'
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { RiPencilFill } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';
import { MdPhone, MdLockOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { GET_USER } from '@/types';
import {useDispatch,useSelector,RootStateOrAny} from 'react-redux'
import PageSpinner from '@/components/Ui/PageSpinner';
import { baseURL } from '@/config';
import { AuthModal } from '@/components/auth';
const ProfilePage = () => {
  const dispatch=useDispatch()
    const currentUser = useSelector(
      (state: RootStateOrAny) => state.login.loggedUser
    );
     const User = useSelector(
       (state: RootStateOrAny) => state.user.user
     );
       const [isOpen, setIsOpen] = useState(false);
      const { isLoading,error } = useSelector(
        (state: RootStateOrAny) => state.user
      );
          useEffect(() => {
      if(error.message){
        router.push('/')
     setIsOpen(true)
      }
    }, [error.message]);
    useEffect(() => {
      if(currentUser.user){
           let token=localStorage.getItem("token")
        let config={ headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      dispatch({type:GET_USER,id:currentUser.user._id,config:config})
      }
    }, []);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <div className=" bg-gray-50 px-12 pb-32">
          <AuthModal
            setOpen={setIsOpen}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />

          {User.data && (
            <>
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
                  <div className="flex w-full gap-16">
                    <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                      <FaRegUser />
                      <p>{User.data.first_name}</p>
                    </div>
                    <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                      <FaRegUser />
                      <p>{User.data.last_name}</p>
                    </div>
                  </div>
                  <div className="flex w-full gap-16">
                    <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
                      <MdPhone />
                      <p>{User.data.phone}</p>
                    </div>
                    <div className="flex w-1/2 items-center gap-4  border-b  py-1 font-roboto-regular">
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
    </>
  );
};

export default ProfilePage;
