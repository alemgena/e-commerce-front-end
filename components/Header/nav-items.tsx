import { useState,useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BiHeart, BiMessage } from 'react-icons/bi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useRouter } from 'next/router';
import { AuthModal } from '../auth';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { loginAction } from '@/store/login';
export function NavItems() {
    const { loggedUser, isUserLogged } = useSelector(
      (state: RootStateOrAny) => state.login
    );
  const [isOpen, setIsOpen] = useState(false);
  const[isLogin,setIsLogin]=useState(false)
  const router = useRouter();
  
  const dispatch=useDispatch()
  const handleLogout=()=>{
    localStorage.removeItem("userInfo")
    localStorage.removeItem("token")
    dispatch(loginAction.setLoggedUser(''))
    dispatch(loginAction.setIsUserLogged(false))
    setIsLogin(false)
  }
   useEffect(() => {
      if (loggedUser) {
       setIsLogin(true)
      }
    }, []);
  return (
    <div className="flex items-center gap-8">
      <button
        onClick={() => router.push('/sell/products/create')}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 px-4 py-2 text-white"
      >
        <AiOutlinePlusCircle size={20} /> <p>Sell</p>
      </button>
      <div className="flex gap-4">
        <button className="relative">
          <BiMessage size={30} className=" text-gray-900" />
          <div className="absolute -top-2 -right-1 rounded-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 px-2 py-1 text-xs text-white">
            <p>1</p>
          </div>
        </button>
        <BiHeart
          onClick={() => router.push('/favorite')}
          size={30}
          className="cursor-pointer text-gray-900"
        />
        <button
          className="relative"
          onClick={() => router.push('/notification')}
        >
          <IoIosNotificationsOutline size={30} className=" text-gray-900" />
          <div className="absolute -top-2 -right-1 rounded-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-500 px-2 py-1 text-xs text-white">
            <p>2</p>
          </div>
        </button>
      </div>

      {isLogin || isUserLogged ? (
        <button
          onClick={() => handleLogout()}
          className="rounded-md border-2 border-blue-800 px-8 py-1 text-blue-800 hover:bg-blue-800 hover:text-white"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md border-2 border-blue-800 px-8 py-1 text-blue-800 hover:bg-blue-800 hover:text-white"
        >
          Login
        </button>
      )}
      <>
        {isLogin || isUserLogged ? (
          <button
            onClick={() => router.push('/auth/profile')}
            className="rounded-md border-2 border-blue-800 px-8 py-1 text-blue-800 hover:bg-blue-800 hover:text-white"
          >
            Profile
          </button>
        ) : null}
      </>
      <AuthModal
        setOpen={setIsOpen}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
