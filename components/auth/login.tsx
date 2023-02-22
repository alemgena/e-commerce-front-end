import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { MdLockOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { CurrentTab } from './modal';
import { LOGIN } from '@/types';
import { loginAction } from '../../store/login';
import Notify from '../../components/Ui/Notify'
import Notification from '../../components/Ui/Notification'
interface ILoginProps {
  onClose: () => void;
  setCurrentTab: (tab: CurrentTab) => void;
  setOpen: (open: boolean) => void;
}
export const Login: React.FC<ILoginProps> = ({ onClose,setOpen, setCurrentTab }) => {
    const { NotifyMessage, notify, setNotify } = Notify();
  const dispatch = useDispatch();
  const [submit, setSubmit] = React.useState(false);
  const { input, password } = useSelector(
    (state: RootStateOrAny) => state.login.inputValues
  );
  const { inputErr, passwordErr } = useSelector(
    (state: RootStateOrAny) => state.login.inputErrors);
  const { error, loggedUser, isLoading } = useSelector(
    (state: RootStateOrAny) => state.login
  );
  useEffect(() => {
     if (error && submit) {
       NotifyMessage({
         message: error.message,
         type: 'error',
       });
     }
  
  }, [error]);
  useEffect(() => {
    if (loggedUser && submit) {
  setOpen(false)
    }
  }, [loggedUser]);
    const validate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Resetting input errors to default
    dispatch(loginAction.setInputErr(''));
    dispatch(loginAction.setPasswordErr(''));
    let isValid = true;

    if (input.length < 4) {
      dispatch(
        loginAction.setInputErr(
          'Email or Phone must be atleast 4 characters!'
        )
      );
      isValid = false;
    }
     if (password.length < 6) {
      dispatch(
        loginAction.setPasswordErr(
          'Password must be atleast 6 characters!'
        )
      );
      isValid = false;
    }
    if(isValid){
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    dispatch({ type: LOGIN, data: { input: input, password: password } });
    setSubmit(true);
  };
  return (
    <div className="flex flex-col gap-14">
      <div className="flex items-center justify-between">
        <h5 className="font-roboto-medium text-lg">Login</h5>
        <Notification notify={notify} setNotify={setNotify} />
        <span className=" cursor-pointer" onClick={onClose}>
          <AiOutlineClose />
        </span>
      </div>
      <div>
        <form className="flex flex-col gap-8" onSubmit={(e) => validate(e)}>
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <FaRegUser />
            </span>
            <input
              type="text"
              value={input}
              placeholder="Enter Email or Phone"
              onChange={(e) => {
                dispatch(loginAction.setInput(e.target.value));
              }}
              className="flex-grow py-1 focus:outline-none"
            />
          </div>
          {inputErr && <div className="text-red-600">{inputErr}</div>}
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <MdLockOutline />
            </span>
            <input
              value={password}
              onChange={(e) => {
                dispatch(loginAction.setPassword(e.target.value));
              }}
              type="password"
              placeholder="Enter password"
              className="flex-grow py-1 focus:outline-none"
            />
          </div>
          {passwordErr && <div className="text-red-600">{passwordErr}</div>}
          {isLoading ? (
            <button
              disabled
              className="rounded-full bg-blue-800 py-2 font-roboto-light text-lg text-white"
            >
              LOGGING ....
            </button>
          ) : (
            <button className="rounded-full bg-blue-800 py-2 font-roboto-light text-lg text-white">
              LOGIN
            </button>
          )}
        </form>
        <div className="mt-4 flex flex-col items-center gap-4 font-roboto-regular text-sm">
          <p
            className="cursor-pointer text-blue-800"
            onClick={() => setCurrentTab('ForgotPassword')}
          >
            Forgot password?
          </p>
          <p>
            if you don't have an account{' '}
            <span
              className="cursor-pointer text-blue-800"
              onClick={() => setCurrentTab('Register')}
            >
              Register
            </span>
          </p>
        </div>

        <div className="my-6 flex items-center gap-3 font-roboto-medium">
          <div className="h-0.5 flex-grow rounded-full bg-gray-100" />
          <h6>OR</h6>
          <div className="h-0.5 flex-grow rounded-full bg-gray-100" />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 font-roboto-regular text-sm">
            <FcGoogle size={25} /> <p>Continute with Google</p>
          </button>
          <button className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 font-roboto-regular text-sm">
            <FaFacebookSquare size={25} className="text-blue-600" />
            <p>Continute with Facebook</p>
          </button>
        </div>
      </div>
    </div>
  );
};
