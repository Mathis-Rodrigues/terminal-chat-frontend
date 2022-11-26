import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useProfileStore from '../Contexts/ProfileContext';

type FormValues = {
  email: string;
  password: string;
};

interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const { t } = useTranslation();
  const [passwordShown, setPasswordShown] = useState(false);
  const updateUserProfile = useProfileStore((state) => state.updateUserProfile);
  const userProfile = useProfileStore((state) => state.userProfile);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onTouched',
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  // const buttonClicktest = () => {
  //   updateUserProfile({ name: 'test', age: 20 });
  //   console.log('fdfd');
  //   changeLanguage('en');
  // };
  return (
    <div className="h-full w-full flex flex-col space-y-6 items-center p-6">
      <h1 className="text-8xl font-vt323 text-primary">{t('login')}</h1>
      <div
        style={{
          boxShadow: 'inset #886400 0px 0px 2rem 0px, #886400 0px 0px 2rem 0px',
        }}
        className="bg-black border-2 border-primary w-full max-w-xl h-2/3 lg:h-1/2 "
      >
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" p-4"
            action="#"
            method="POST"
          >
            <div className="space-y-2">
              <p className="text-xl text-primary font-vt323">{t('email')}</p>
              <input
                {...register('email', {
                  required: true,
                  maxLength: 99,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('invalidEmail'),
                  },
                })}
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                className="z-10 relative w-full px-3 py-2 border bg-black
                text-primary rounded-md focus:outline-none  focus:ring-2 focus:ring-primary border-primary text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-md font-vt323">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-xl text-primary font-vt323">{t('password')}</p>
              <div className="relative w-auto">
                <div>
                  <input
                    {...register('password', {
                      required: true,
                      maxLength: 99,
                    })}
                    type={passwordShown ? 'text' : 'password'}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    className="z-10 relative w-full px-3 py-2 border bg-black
                text-primary rounded-md focus:outline-none  focus:ring-2 focus:ring-primary border-primary text-sm pr-8"
                  />
                  <FontAwesomeIcon
                    className="text-primary cursor-pointer absolute z-10 right-2 top-2 mx-auto text-xl"
                    icon={passwordShown ? faEye : faEyeSlash}
                    onClick={() => setPasswordShown(!passwordShown)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="z-10 mt-10 font-vt323 font-bold text-2xl relative w-2/3 flex justify-center py-2 px-4 border border-transparent rounded-md bg-primary hover:bg-yellow-600 "
              >
                {t('signIn').toUpperCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
