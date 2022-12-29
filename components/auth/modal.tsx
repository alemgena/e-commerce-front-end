import { CustomModal } from '../modal';
import { Login } from './login';

interface IAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<IAuthModalProps> = (props) => {
  const { isOpen, onClose } = props;
  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={onClose}
      width={1050}
      contentStyle={{
        display: 'flex',
        padding: 0,
      }}
      showCloseIcon={false}
    >
      <div className="flex w-full ">
        <div className="flex h-full w-1/2 flex-col items-center justify-center bg-gray-100 ">
          <img src="/images/logo.svg" className="h-56  w-52" />
          <div className="mt-4 text-center font-roboto-bold text-4xl text-blue-800">
            <h1>LIYU DIGITAL </h1>
            <h1>TECHNOLOGY</h1>
          </div>
        </div>
        <div className="w-1/2 py-6 px-12">
          <Login onClose={onClose} />
        </div>
      </div>
    </CustomModal>
  );
};
