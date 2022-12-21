/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';

// type NavBarProps = {};

function NavBar() {
  const { t } = useTranslation();

  const goToHome = () => {
    window.location.href = '/';
  };

  const handleChange = (event: any) => {
    changeLanguage(event.target.value);
    window.location.reload();
  };
  return (
    <div className="flex h-14 w-full items-center justify-between bg-primary px-4 font-vt323">
      <p onClick={goToHome} onKeyDown={goToHome} className="cursor-pointer text-4xl text-black md:text-6xl">CYBERCHAT</p>
      <select
        defaultValue={localStorage.getItem('i18nextLng') as any}
        onChange={handleChange}
        id="countries"
        className="text-md w-24 rounded-lg bg-black p-2.5 text-primary md:w-36 md:text-xl "
      >
        <option value="en">{t('english').toUpperCase()}</option>
        <option value="fr">{t('french').toUpperCase()}</option>
      </select>
    </div>
  );
}
export default NavBar;
