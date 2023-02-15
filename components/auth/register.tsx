import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdPhone, MdLockOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { CurrentTab } from './modal';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { registerAction } from '../../store/register';
import { REGISTER } from '@/types';
import Notify from '../../components/Ui/Notify';
import Notification from '../../components/Ui/Notification';
interface IRegisterProps {
  onClose: () => void;
  setCurrentTab: (tab: CurrentTab) => void;
}

export const Register: React.FC<IRegisterProps> = ({
  onClose,
  setCurrentTab,
}) => {
  const dispatch = useDispatch();
  const { NotifyMessage, notify, setNotify } = Notify();
  const { first_name, last_name, email, phone, password1, password2 } =
    useSelector((state: RootStateOrAny) => state.register.inputValues);
  const { error, userInfo, isLoading } = useSelector(
    (state: RootStateOrAny) => state.register
  );
  const [submit, setSubmit] = React.useState(false);
  React.useEffect(() => {
    if (error && submit) {
      NotifyMessage({
        message: error.message,
        type: 'error',
      });
    }
  }, [error]);
  React.useEffect(() => {
    if (userInfo && submit) {
      setCurrentTab('Login');
    }
  }, [userInfo]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: REGISTER,
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        //  phone:phone,
        password: password1,
      },
    });
    setSubmit(true);
  };
  return (
    <div className="flex flex-col gap-14">
      <div className="flex items-center justify-between">
        <h5 className="font-roboto-medium text-lg">Register</h5>
        <Notification notify={notify} setNotify={setNotify} />
        <span className=" cursor-pointer" onClick={onClose}>
          <AiOutlineClose />
        </span>
      </div>
      <div>
        <form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <FaRegUser />
            </span>
            <input
              type="text"
              placeholder="First name"
              className="flex-grow py-1 focus:outline-none"
              value={first_name}
              onChange={(e) => {
                dispatch(registerAction.setFirstName(e.target.value));
              }}
            />
          </div>
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <FaRegUser />
            </span>
            <input
              type="text"
              placeholder="Last name"
              className="flex-grow py-1 focus:outline-none"
              value={last_name}
              onChange={(e) => {
                dispatch(registerAction.setLastName(e.target.value));
              }}
            />
          </div>
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <FaRegUser />
            </span>
            <input
              type="text"
              placeholder="Email"
              className="flex-grow py-1 focus:outline-none"
              value={email}
              onChange={(e) => {
                dispatch(registerAction.setEmail(e.target.value));
              }}
            />
          </div>
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <MdPhone />
            </span>
            <input
              type="text"
              placeholder="+251911223344"
              className="flex-grow py-1 focus:outline-none"
              value={phone}
              onChange={(e) => {
                dispatch(registerAction.setPhone(e.target.value));
              }}
            />
          </div>
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <MdLockOutline />
            </span>
            <input
              type="password"
              placeholder="Enter password"
              className="flex-grow py-1 focus:outline-none"
              value={password1}
              onChange={(e) => {
                dispatch(registerAction.setPassword1(e.target.value));
              }}
            />
          </div>
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <MdLockOutline />
            </span>
            <input
              type="password"
              placeholder="Confirm password"
              className="flex-grow py-1 focus:outline-none"
              value={password2}
              onChange={(e) => {
                dispatch(registerAction.setPassword2(e.target.value));
              }}
            />
          </div>
          {isLoading ? (
            <button
              disabled
              className="rounded-full bg-blue-800 py-2 font-roboto-light text-lg text-white"
            >
              REGISTERING ....
            </button>
          ) : (
            <button className="rounded-full bg-blue-800 py-2 font-roboto-light text-lg text-white">
              REGISTER
            </button>
          )}
        </form>
        <div className="my-8 flex flex-col items-center gap-4 font-roboto-regular text-sm">
          <p>
            <span
              className="cursor-pointer text-blue-800"
              onClick={() => setCurrentTab('Login')}
            >
              Login
            </span>{' '}
            if already have an account
          </p>
        </div>
      </div>
    </div>
  );
};
