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
    <div
      tabIndex={-1}
      role="button"
      onKeyDown={() => {}}
      onClick={(event) => {
        if ((event.target as HTMLElement).id === 'backdrop') {
          setIsOpen(false);
        }
      }}
    >
      <Modal
        id="backdrop"
        show={isOpen}
        onHide={() => setIsOpen(false)}
        onExit={() => setIsOpen(false)}
        className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="relative rounded-md border-2 border-primary bg-black lg:w-1/3 w-1/2">
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onPasswordSubmit(passwordInput);
              }
            }}
            tabIndex={0}
            placeholder={t('enterRoomPassword')}
            className="w-full max-w-xl rounded-md bg-black px-2 py-2
              font-vt323 text-xl text-primary focus:outline-none placeholder:text-primary "
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Popup;
