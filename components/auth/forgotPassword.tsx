import React, { useEffect, ChangeEvent, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { MdCall, MdLockOutline, MdPhone } from 'react-icons/md';
import { FORGET_PASSWORD } from '@/types';
import { CurrentTab } from './modal';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import Notify from '../../components/Ui/Notify';
import Notification from '../../components/Ui/Notification';
interface IRegisterProps {
  onClose: () => void;
  setCurrentTab: (tab: CurrentTab) => void;
}

export const ForgotPassword: React.FC<IRegisterProps> = ({
  onClose,
  setCurrentTab,
}) => {
  const dispatch = useDispatch();
  const { error, passwordRecovered, isLoading } = useSelector(
    (state: RootStateOrAny) => state.recoverPassword
  );
  const [email, setEmail] = useState<string>();
  const[submit,setSubmit]=useState(false)
   const { NotifyMessage, notify, setNotify } = Notify();
    useEffect(() => {
      if (error && submit) {
        NotifyMessage({
          message: error.message,
          type: 'error',
        });
      }
    }, [error]);
    useEffect(() => {
      if (passwordRecovered && submit) {
        NotifyMessage({
          message: `Your new password is sent to ${email}. Check your email`,
          type: 'success',
        });
      }
    }, [passwordRecovered]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: FORGET_PASSWORD, email: { email: email } });
 setSubmit(true)
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  return (
    <div className="mb-24 flex flex-col gap-14 ">
      <div className="mb-12 flex items-center justify-between">
        <h5 className="font-roboto-medium text-lg">Reset Password</h5>
        <Notification notify={notify} setNotify={setNotify} />
        <span
          className=" cursor-pointer"
          onClick={() => {
            onClose();
            setCurrentTab('Login');
          }}
       
        >
          <AiOutlineClose />
        </span>
      </div>
      <div>
        <p className="content-center font-roboto-medium">
          Enter Email and Reset Your Password
        </p>
      </div>
      <div>
        <form
          className="flex flex-col gap-28 "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex items-center gap-4 rounded-md px-2 py-3 font-roboto-regular shadow-sm">
            <span className="px-3">
              <MdCall />
            </span>
            <input
              value={email}
              type="text"
              placeholder="Email"
              className="flex-grow py-1 focus:outline-none"
              onChange={onChange}
            />
          </div>
          {isLoading ? (
            <button className="rounded-full bg-blue-800 py-2  font-roboto-light text-lg text-white">
              Reseting ....
            </button>
          ) : (
            <button className="rounded-full bg-blue-800 py-2  font-roboto-light text-lg text-white">
              Reset
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
