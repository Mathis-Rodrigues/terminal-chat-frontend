/* eslint-disable implicit-arrow-linebreak */
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
  username: string;
  password: string;
  passwordConfirm: string;
};

// interface Props {}

function RegisterPage() {
  const { t } = useTranslation();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onTouched',
  });
  // const password = watch('password');

  const validatePassword = (value: any) =>
    value === getValues().password || (t('passwordsDontMatch') as any);

  return (
    <div className="flex h-full w-full flex-col items-center space-y-6">
      <h1 className="font-vt323 text-6xl text-primary md:text-8xl">
        {t('register')}
      </h1>
      <div className="max-h-auto w-full max-w-xl border-2 border-primary bg-black p-6 pb-10 shadow-cyber">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2"
          action="#"
          method="POST"
        >
          <div className="">
            <p className="font-vt323 text-xl text-primary ">{t('email')}</p>
            <input
              {...register('email', {
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
          <div className="">
            <p className="font-vt323 text-xl text-primary">{t('username')}</p>
            <input
              {...register('username', {
                required: {
                  value: true,
                  message: t('fieldRequired'),
                },
                maxLength: 99,
              })}
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="relative z-10 w-full rounded-md border border-primary bg-black
                px-3 py-2 text-sm  text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.username && (
              <p className="text-md font-vt323 text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="">
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
          <div className="">
            <p className="font-vt323 text-xl text-primary">
              {t('confirmPassword')}
            </p>
            <div className="relative w-auto">
              <div>
                <input
                  {...register('passwordConfirm', {
                    required: {
                      value: true,
                      message: t('fieldRequired'),
                    },
                    maxLength: 99,
                    validate: (value) => validatePassword(value),
                  })}
                  type={passwordShown ? 'text' : 'password'}
                  name="passwordConfirm"
                  id="passwordConfirm"
                  className="relative z-10 w-full rounded-md border border-primary bg-black
                px-3 py-2 pr-8 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <FontAwesomeIcon
                  className="absolute right-2 top-2 z-10 mx-auto cursor-pointer text-xl text-primary"
                  icon={passwordShown ? faEye : faEyeSlash}
                  onClick={() => setPasswordShown(!passwordShown)}
                />
              </div>
              {errors.passwordConfirm && (
                <p className="text-md font-vt323 text-red-500">
                  {errors.passwordConfirm?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="mt-2 flex w-2/3 justify-center rounded-md border-2 border-primary py-2  px-4 font-vt323 text-2xl
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

export default RegisterPage;