import { ReactNode } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';

Modal.setAppElement('#react-modals');

interface ModalType {
  children: ReactNode;
  isOpen: boolean;
  closeable?: boolean;
  onCancel: () => void;
  width?: number;
  height?: number;
  contentStyle?: React.CSSProperties;
  showCloseIcon?: boolean;
}

export const CustomModal = ({
  children,
  isOpen,
  closeable,
  onCancel,
  width,
  height,
  contentStyle = {},
  showCloseIcon = false,
}: ModalType) => {
  return (
    <div className="relative">
      <Modal
        style={{
          content: {
            margin: 'auto',
            borderRadius: 15,
            padding: '0 10px',
            width: width || 'fit-content',
            height: height || 'fit-content',
            overflowY: 'auto',
            zIndex: 999,
            ...contentStyle,
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
        }}
        closeTimeoutMS={500}
        isOpen={isOpen}
        onRequestClose={onCancel}
        shouldCloseOnEsc={closeable}
        shouldFocusAfterRender={true}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={closeable}
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
