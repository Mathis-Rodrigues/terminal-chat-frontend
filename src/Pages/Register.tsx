/* eslint-disable prettier/prettier */
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
    // console.log(data);
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

  const validatePassword = (value: any) => value === getValues('password') || t('passwordsDontMatch') as any;

  return (
    <div className="h-full w-full flex flex-col space-y-6 items-center p-6">
      <h1 className="text-8xl font-vt323 text-primary">{t('register')}</h1>
      <div className="bg-black border-2 border-primary w-full max-w-xl max-h-auto shadow-cyber p-6 pb-10">
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2"
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
                    className="z-10 relative w-full px-3 py-2 border bg-black
                text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-primary text-sm pr-8"
                  />
                  <FontAwesomeIcon
                    className="text-primary cursor-pointer absolute z-10 right-2 top-2 mx-auto text-xl"
                    icon={passwordShown ? faEye : faEyeSlash}
                    onClick={() => setPasswordShown(!passwordShown)}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xl text-primary font-vt323">{t('confirmPassword')}</p>
              <div className="relative w-auto">
                <div>
                  <input
                    {...register('password', {
                      required: true,
                      maxLength: 99,
                      validate: (value) => validatePassword(value),
                    })}
                    type={passwordShown ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirmPassword"
                    className="z-10 relative w-full px-3 py-2 border bg-black
                text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-primary text-sm pr-8"
                  />
                  <FontAwesomeIcon
                    className="text-primary cursor-pointer absolute z-10 right-2 top-2 mx-auto text-xl"
                    icon={passwordShown ? faEye : faEyeSlash}
                    onClick={() => setPasswordShown(!passwordShown)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <button
                type="submit"
                className="mt-10 font-vt323 shadow-cyber font-bold text-2xl text-primary border-2 border-primary  w-2/3 flex justify-center
                py-2 px-4 rounded-md hover:bg-primary hover:text-black"
              >
                {t('signIn').toUpperCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
