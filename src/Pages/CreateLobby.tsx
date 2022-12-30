/* eslint-disable react/jsx-props-no-spreading */

import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Rooms from '../Services/Rooms';

type FormValues = {
  name: string;
  subject: string;
  password: string;
};

function CreateLobby() {
  const { t } = useTranslation();
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  const createRoomMutation = useMutation(Rooms.createRoom, {
    onSuccess: (data) => {
      navigate(`/lobby/${data._id}?password=${data.password}`);
    },
  });

  const onSubmit = (data: FormValues) => {
    createRoomMutation.mutate(data);
  };

  return (
    <div className="flex h-full w-full flex-col items-center space-y-6">
      <h1 className="font-vt323 text-6xl text-primary md:text-8xl">
        {t('createRoom')}
      </h1>
      <div className="max-h-auto w-full max-w-xl border-2 border-primary bg-black p-6 pb-10 shadow-cyber">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <p className="font-vt323 text-xl text-primary ">{t('roomName')}</p>
            <input
              {...register('name', {
                required: {
                  value: true,
                  message: t('fieldRequired'),
                },
                maxLength: 99,
              })}
              type="text"
              name="name"
              id="name"
              className="relative z-10 w-full rounded-md border border-primary bg-black
                px-3 py-2 text-sm  text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && (
              <p className="text-md font-vt323 text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <p className="font-vt323 text-xl text-primary">
              {t('roomSubject')}
            </p>
            <input
              {...register('subject', {
                maxLength: 99,
              })}
              type="text"
              name="subject"
              id="subject"
              className="relative z-10 w-full rounded-md border border-primary bg-black
                px-3 py-2 text-sm  text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.subject && (
              <p className="text-md font-vt323 text-red-500">
                {errors.subject.message}
              </p>
            )}
          </div>
          <div className="">
            <p className="font-vt323 text-xl text-primary">{t('password')}</p>
            <div className="relative w-auto">
              <div>
                <input
                  {...register('password', {
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
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="mt-2 flex w-2/3 justify-center rounded-md border-2 border-primary py-2  px-4 font-vt323 text-2xl
                font-bold text-primary shadow-cyber hover:bg-primary hover:text-black"
            >
              {t('createRoom').toUpperCase()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLobby;
