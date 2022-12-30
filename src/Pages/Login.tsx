/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProfileStore from '../Contexts/ProfileContext';
import UsersService from '../Services/Users';
import { Profile } from '../Types/Profile';

type FormValues = {
  mail: string;
  password: string;
};

// type LoginPageProps = {};

function LoginPage() {
  const { t } = useTranslation();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');
  const updateUserProfile = useProfileStore((state) => state.updateUserProfile);
  // const userProfile = useProfileStore((state) => state.userProfile);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  const onRegisterClick = () => {
    navigate('/register');
  };

  const onSubmit = (data: FormValues) => {
    UsersService.login(data)
      .then((res) => {
        updateUserProfile(res as Profile);
        localStorage.setItem('token', res.token);
        // updateUserProfile()
        navigate('/home');
      })
      .catch(() => {
        setServerError(t('loginServerError').toString());
      });
    setServerError('');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="flex h-full w-full flex-col items-center space-y-6">
      <h1 className="font-vt323 text-8xl text-primary">{t('login')}</h1>
      <div className="max-h-auto flex  w-full max-w-xl flex-col border-2 border-primary bg-black p-6 pb-10 shadow-cyber">
        {serverError && (
          <p className="items-center self-center font-vt323 text-lg text-red-500">
            {serverError}
          </p>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2"
          action="#"
          method="POST"
        >
          <div className="space-y-2">
            <p className="font-vt323 text-xl text-primary">{t('email')}</p>
            <input
              {...register('mail', {
                required: {
                  value: true,
                  message: t('fieldRequired'),
                },
                maxLength: 99,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('invalidEmail'),
                },
              })}
              type="text"
              name="mail"
              id="mail"
              autoComplete="email"
              className="relative z-10 w-full rounded-md border border-primary bg-black
                px-3 py-2 text-sm  text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.mail && (
              <p className="text-md font-vt323 text-red-500">
                {errors.mail.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <p className="font-vt323 text-xl text-primary">{t('password')}</p>
            <div className="relative w-auto">
              <div>
                <input
                  {...register('password', {
                    required: {
                      value: true,
                      message: t('fieldRequired'),
                    },
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
              {errors.password && (
                <p className="text-md font-vt323 text-red-500">
                  {errors.password?.message}
                </p>
              )}
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
              <p className="font-vt323 text-primary">{t('or').toUpperCase()}</p>
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
  );
}

export default LoginPage;
