import { ReactNode } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';

Modal.setAppElement('#react-modals');

interface ModalType {
  children: ReactNode;
  isOpen: boolean;
  closable?: boolean;
  onCancel: () => void;
  width?: number;
  minHeight?: number;
  contentStyle?: React.CSSProperties;
  showCloseIcon?: boolean;
}

export const CustomModal = ({
  children,
  isOpen,
  closable,
  onCancel,
  width,
  minHeight,
  contentStyle = {},
  showCloseIcon = true,
}: ModalType) => {
  return (
    <div className="relative">
      <Modal
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            border: '0px',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: width || 700,
            borderRadius: 15,
            minHeight: minHeight || 400,
            padding: '30px 40px',
            maxWidth: 'calc(100vw - 2rem)',
            overflowY: 'auto',
            zIndex: 2,
            ...contentStyle,
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
        }}
        closeTimeoutMS={500}
        isOpen={isOpen}
        onRequestClose={onCancel}
        shouldCloseOnEsc={closable}
        shouldCloseOnOverlayClick={closable}
        contentLabel={'Modal'}
        testId={'modal'}
      >
        {showCloseIcon && (
          <span
            className="text-dark-light absolute top-3 right-4 cursor-pointer"
            onClick={() => {
              onCancel();
            }}
          >
            <AiOutlineClose />
          </span>
        )}

        {children}
      </Modal>
    </div>
  );
};
