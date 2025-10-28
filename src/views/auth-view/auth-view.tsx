'use client';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useLogin, useRegister } from '@/utils';
import './auth-view.css';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components';
import type { TAuthnDataRequest } from '@/types';

const FIELDS_COUNT_SIGNUP = 4;
const FIELDS_COUNT_SIGNIN = 2;

export default function AuthView() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'signin';

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      password_confirm: '',
      user_name: '',
    },
  });
  const { loginUser, error: loginError } = useLogin();
  const { signInUser, error: registerError } = useRegister();

  const onSubmit = (data: TAuthnDataRequest) => {
    mode === 'signup' ? signInUser(data) : loginUser(data);
  };

  const error = loginError || registerError;
  const isDisabled =
    Object.keys(dirtyFields).length !==
    (mode === 'signup' ? FIELDS_COUNT_SIGNUP : FIELDS_COUNT_SIGNIN);

  const errorCheck =
    typeof error === 'string' ? error : error?.message || 'An error occurred';

  return (
    <div className="auth-view">
      <div className="auth-title-container">
        <h1 className="auth-title">
          {t(mode === 'signup' ? 'AUTH_REGISTER_TITLE' : 'AUTH_LOGIN_TITLE')}
        </h1>
      </div>

      <div className="auth-form-container">
        <form
          id="auth-form"
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="auth-form-group">
            {mode === 'signup' && (
              <Input
                label={t('AUTH_USER_NAME_LABEL')}
                type="text"
                placeholder={t('AUTH_USER_NAME_PLACEHOLDER')}
                {...register('user_name')}
              />
            )}
            <Input
              label={t('AUTH_EMAIL_LABEL')}
              type="email"
              placeholder={t('AUTH_EMAIL_PLACEHOLDER')}
              {...register('email')}
            />
            <Input
              label={t('AUTH_PASSWORD_LABEL')}
              type="password"
              placeholder={t('AUTH_PASSWORD_PLACEHOLDER')}
              {...register('password')}
            />
            {mode === 'signup' && (
              <Input
                label={t('AUTH_CONFIRM_PASSWORD_LABEL')}
                type="password"
                placeholder={t('AUTH_CONFIRM_PASSWORD_PLACEHOLDER')}
                {...register('password_confirm')}
              />
            )}
          </div>

          {/* //TODO add google and fb login */}
          <button type="submit" className="auth-btn " disabled={isDisabled} />
        </form>
        {error && (
          <p className={`auth-error auth-error-${mode}`}>{t(errorCheck)}</p>
        )}
      </div>
    </div>
  );
}
