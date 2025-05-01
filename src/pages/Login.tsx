import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { toast } = useToast();
  const { login, isLoading: authLoading } = useAuth();
  const { t } = useLanguage(); // Get translation function
  const [showPassword, setShowPassword] = React.useState(false);

  // We'll use only the auth context's loading state to avoid race conditions
  // No need for local loading state that might get out of sync

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      // Let the AuthContext handle navigation - removed navigate("/") here
      await login(values.email, values.password);
      // Toast is now handled by the AuthContext - no need to duplicate it here
    } catch (error) {
      // The toast for errors is already handled in AuthContext
      console.error("Login error:", error);
      // We don't need to handle the error here since AuthContext already shows a toast
    }
  };

  return (
    <div className="min-h-screen bg-capsule-bg flex flex-col">
      <div className="py-8 px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-capsule-text hover:text-capsule-accent transition-colors"
        >
          <ArrowLeft size={18} />
          <span>{t("back_to_home")}</span>
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-xl shadow-capsule p-8">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 mb-6"
            >
              <div className="w-12 h-12 relative flex items-center justify-center text-white overflow-hidden group">
                <img
                  src="/images/logo-black.png"
                  alt={t("app_name")}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-xl font-semibold text-capsule-text tracking-tight">
                Culture Capsule
              </span>
            </Link>

            <h1 className="text-2xl text-black font-serif font-semibold mb-2">
              {t("login_title")}
            </h1>
            <p className="text-capsule-text/70">{t("login_subtitle")}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email_label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("email_placeholder")}
                        {...field}
                        disabled={authLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password_label")}</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder={t("password_placeholder")}
                          {...field}
                          disabled={authLoading}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-capsule-text/50 hover:text-capsule-text"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? t("hide_password") : t("show_password")
                        }
                        disabled={authLoading}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="rounded border-capsule-text/30 text-capsule-accent focus:ring-capsule-accent"
                    onChange={(e) =>
                      form.setValue("rememberMe", e.target.checked)
                    }
                    disabled={authLoading}
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm text-capsule-text"
                  >
                    {t("remember_me")}
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-sm text-capsule-accent hover:underline"
                >
                  {t("forgot_password")}
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-capsule-accent hover:bg-capsule-accent/90"
                disabled={authLoading}
              >
                {authLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    {t("logging_in")}
                  </>
                ) : (
                  t("login_button")
                )}
              </Button>

              <div className="text-center mt-6">
                <p className="text-sm text-capsule-text/70">
                  {t("no_account_text")}{" "}
                  <Link
                    to="/signup"
                    className="text-capsule-accent hover:underline"
                  >
                    {t("signup_link")}
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
