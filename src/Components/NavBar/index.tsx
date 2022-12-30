import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';
import useProfileStore from '../../Contexts/ProfileContext';
import { Profile } from '../../Types/Profile';

function NavBar() {
  const { t } = useTranslation();
  const updateUserProfile = useProfileStore((state) => state.updateUserProfile);
  const userProfile = useProfileStore((state) => state.userProfile);

  const goToHome = () => {
    window.location.href = '/home';
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
    updateUserProfile({} as Profile);
  };

  const handleChange = (event: any) => {
    changeLanguage(event.target.value);
    window.location.reload();
  };
  return (
    <div className="flex h-14 w-full items-center justify-between bg-primary px-4 font-vt323">
      <button
        type="button"
        onClick={goToHome}
        className="cursor-pointer text-4xl text-black md:text-6xl"
      >
        TERMINAL CHAT
      </button>
      <div className="flex items-center gap-x-4">
        <select
          defaultValue={localStorage.getItem('i18nextLng') as any}
          onChange={handleChange}
          id="countries"
          className="text-md w-24 cursor-pointer rounded-lg bg-black p-2.5 text-primary md:w-36 md:text-xl"
        >
          <option value="en">{t('english').toUpperCase()}</option>
          <option value="fr">{t('french').toUpperCase()}</option>
        </select>
        {userProfile.name && (
          <FontAwesomeIcon
            className="z-10 cursor-pointer text-xl text-black md:text-2xl"
            icon={faRightFromBracket}
            onClick={logout}
          />
        )}
      </div>
    </div>
  );
}
export default NavBar;
