import { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';

interface NavBarProps {}

const NavBar: React.FunctionComponent<NavBarProps> = () => {
  const { t } = useTranslation();

  const handleChange = (event: any) => {
    changeLanguage(event.target.value);
    window.location.reload();
  };
  return (
    <div className=" bg-primary w-screen h-14 bloc items-center font-vt323 flex justify-between px-4">
      <p className="text-black md:text-6xl text-4xl">CYBERCHAT</p>
      <select
        defaultValue={localStorage.getItem('i18nextLng') as any}
        // defaultValue={localStorage.getItem('i18nextLng')}
        onChange={handleChange}
        id="countries"
        // className="w-36 custom-select "
        className="bg-black w-36   text-xl text-primary rounded-lg p-2.5 "
      >
        <option value="en">{t('english').toUpperCase()}</option>
        <option value="fr">{t('french').toUpperCase()}</option>
      </select>
    </div>
  );
};
export default NavBar;
