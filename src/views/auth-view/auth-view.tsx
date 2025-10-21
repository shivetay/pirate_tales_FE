"use client";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useLogin, useRegister } from "@/utils";
import "./auth-view.css";
import { Input } from "@/components";
import useTranslation from "next-translate/useTranslation";
import type { TAuthnDataRequest } from "@/types";

export default function AuthView() {
  const { t } = useTranslation("common");

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "signin";

  const {
    register,
    handleSubmit,
    formState: { isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      password_confirm: "",
      user_name: "",
    },
  });
  const { loginUser, error } = useLogin();
  const { signInUser, error: registerError } = useRegister();

  const onSubmit = (data: TAuthnDataRequest) => {
    mode === "signup" ? signInUser(data) : loginUser(data);
  };

  const isDisabled = Object.keys(dirtyFields).length !== 4;

  console.log(error, registerError);

  return (
    <div className="auth-view">
      <div className="auth-title-container">
        <h1 className="auth-title">
          {t(mode === "signup" ? "AUTH_REGISTER_TITLE" : "AUTH_LOGIN_TITLE")}
        </h1>
      </div>

      <div className="auth-form-container">
        <form
          id="auth-form"
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="auth-form-group">
            {mode === "signup" && (
              <Input
                label={t("AUTH_USER_NAME_LABEL")}
                type="text"
                placeholder={t("AUTH_USER_NAME_PLACEHOLDER")}
                {...register("user_name")}
              />
            )}
            <Input
              label={t("AUTH_EMAIL_LABEL")}
              type="email"
              placeholder={t("AUTH_EMAIL_PLACEHOLDER")}
              {...register("email")}
            />
            <Input
              label={t("AUTH_PASSWORD_LABEL")}
              type="password"
              placeholder={t("AUTH_PASSWORD_PLACEHOLDER")}
              {...register("password")}
            />
            {mode === "signup" && (
              <Input
                label={t("AUTH_CONFIRM_PASSWORD_LABEL")}
                type="password"
                placeholder={t("AUTH_CONFIRM_PASSWORD_PLACEHOLDER")}
                {...register("password_confirm")}
              />
            )}
          </div>

          {/* //TODO add google and fb login */}
          <button type="submit" className="auth-btn " disabled={isDisabled} />
        </form>
      </div>
      {/* //TODO add errors */}
    </div>
  );
}
