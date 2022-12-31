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
      className="top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 fixed bg-black bg-opacity-50"
    >
      <div
        className="bg-black p-5 border-2 border-primary rounded-md relative"
      >
        <FontAwesomeIcon
          className="z-10 cursor-pointer md:text-xl absolute top-2 right-2 text-primary"
          icon={faClose}
          onClick={() => setIsOpen(false)}
        />
        <input
          placeholder={t('enterRoomPassword')}
          className="w-full max-w-xl bg-black px-2 py-2 font-vt323
              text-xl text-primary focus:outline-none rounded-md"
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
