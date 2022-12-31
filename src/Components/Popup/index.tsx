import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-overlays';

interface PopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onPasswordSubmit: (password: string) => void;
}

function Popup({ isOpen, setIsOpen, onPasswordSubmit }: PopupProps) {
  const [passwordInput, setPasswordInput] = useState('');
  const { t } = useTranslation();

  return (
    <Modal
      onBackdropClick={() => setIsOpen(false)}
      show={isOpen}
      onHide={() => setIsOpen(false)}
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative rounded-md border-2 border-primary bg-black p-5 lg:w-1/3 w-1/2">
        <FontAwesomeIcon
          className="absolute top-2 right-2 z-10 cursor-pointer text-primary md:text-xl"
          icon={faClose}
          onClick={() => setIsOpen(false)}
        />
        <input
          placeholder={t('enterRoomPassword')}
          className="w-full max-w-xl rounded-md bg-black px-2 py-2
              font-vt323 text-xl text-primary focus:outline-none"
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <div className="flex items-center justify-center ">
          <button
            type="button"
            className="mt-3 font-vt323 text-xl text-primary"
            onClick={() => onPasswordSubmit(passwordInput)}
          >
            {t('join')}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Popup;
