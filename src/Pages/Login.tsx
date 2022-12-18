/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProfileStore from '../Contexts/ProfileContext';

type FormValues = {
  email: string;
  password: string;
};

// type LoginPageProps = {};

function LoginPage() {
  const { t } = useTranslation();
  const [passwordShown, setPasswordShown] = useState(false);
  // const updateUserProfile = useProfileStore((state) => state.updateUserProfile);
  // const userProfile = useProfileStore((state) => state.userProfile);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onTouched',
  });

  const onRegisterClick = () => {
    navigate('/register');
  };

  const onSubmit = (data: any) => {
    // console.log(data);
  };
  // const buttonClicktest = () => {
  //   updateUserProfile({ name: 'test', age: 20 });
  //   console.log('fdfd');
  //   changeLanguage('en');
  // };
  return (
    <div className="flex h-full w-full flex-col items-center space-y-6">
      <h1 className="font-vt323 text-8xl text-primary">{t('login')}</h1>
      <div className="max-h-auto w-full max-w-xl border-2 border-primary bg-black p-6 pb-10 shadow-cyber">
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2"
            action="#"
            method="POST"
          >
            <div className="space-y-2">
              <p className="font-vt323 text-xl text-primary">{t('email')}</p>
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
                className="relative z-10 w-full rounded-md border border-primary bg-black
                px-3 py-2 text-sm  text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="text-md font-vt323 text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <p className="font-vt323 text-xl text-primary">{t('password')}</p>
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
                    className="relative z-10 w-full rounded-md border border-primary bg-black
                px-3 py-2 pr-8 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <FontAwesomeIcon
                    className="absolute right-2 top-2 z-10 mx-auto cursor-pointer text-xl text-primary"
                    icon={passwordShown ? faEye : faEyeSlash}
                    onClick={() => setPasswordShown(!passwordShown)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <button
                type="submit"
                className="mt-10 flex w-2/3 justify-center rounded-md border-2 border-primary py-2  px-4 font-vt323 text-2xl
                font-bold text-primary shadow-cyber hover:bg-primary hover:text-black"
              >
                {t('signIn').toUpperCase()}
              </button>
              <div className="flex h-auto w-full items-center space-x-2">
                <div style={{ height: '2px' }} className=" w-full bg-primary" />
                <p className="font-vt323 text-primary">
                  {t('or').toUpperCase()}
                </p>
                <div style={{ height: '2px' }} className="w-full bg-primary" />
              </div>
              <button
                onClick={() => onRegisterClick()}
                type="submit"
                className="mt-10 flex w-2/3 justify-center rounded-md border-2 border-primary py-2  px-4 font-vt323 text-2xl
                font-bold text-primary shadow-cyber hover:bg-primary hover:text-black"
              >
                {t('register').toUpperCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
