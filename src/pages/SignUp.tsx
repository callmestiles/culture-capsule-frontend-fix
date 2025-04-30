import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext"; // Import the language context

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

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signup, isLoading: authLoading } = useAuth();
  const { t } = useLanguage(); // Get the translation function
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Define schema with translated messages
  const signUpSchema = z
    .object({
      firstName: z
        .string()
        .min(2, { message: t("signup_validation_firstName_min") }),
      lastName: z
        .string()
        .min(2, { message: t("signup_validation_lastName_min") }),
      email: z.string().email({ message: t("signup_validation_email") }),
      password: z
        .string()
        .min(8, { message: t("signup_validation_password_min") })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
          message: t("signup_validation_password_complexity"),
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("signup_validation_password_match"),
      path: ["confirmPassword"],
    });

  type SignUpValues = z.infer<typeof signUpSchema>;

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpValues) => {
    try {
      await signup(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.confirmPassword
      );
    } catch (error) {
      toast({
        title: t("signup_error_title"),
        description:
          error instanceof Error ? error.message : t("signup_error_generic"),
        variant: "destructive",
      });
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
          <span>{t("signup_back_home")}</span>
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
                  alt="Culture Capsule"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-xl font-semibold text-capsule-text tracking-tight">
                Culture Capsule
              </span>
            </Link>

            <h1 className="text-2xl font-serif font-semibold mb-2 text-black">
              {t("signup_title")}
            </h1>
            <p className="text-capsule-text/70">{t("signup_subtitle")}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("signup_firstName_label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("signup_firstName_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("signup_lastName_label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("signup_lastName_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("signup_email_label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("signup_email_placeholder")}
                        {...field}
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
                    <FormLabel>{t("signup_password_label")}</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder={t("signup_password_placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-capsule-text/50 hover:text-capsule-text"
                        onClick={() => setShowPassword(!showPassword)}
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("signup_confirmPassword_label")}</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t("signup_confirmPassword_placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-capsule-text/50 hover:text-capsule-text"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
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

              <Button
                type="submit"
                className="w-full bg-capsule-accent hover:bg-capsule-accent/90"
                disabled={authLoading}
              >
                {authLoading ? (
                  <>
                    {t("signup_button_loading")}
                    <Loader2 className="animate-spin ml-2" />
                  </>
                ) : (
                  t("signup_button")
                )}
              </Button>

              <div className="text-center mt-6">
                <p className="text-sm text-capsule-text/70">
                  {t("signup_login_prompt")}{" "}
                  <Link
                    to="/login"
                    className="text-capsule-accent hover:underline"
                  >
                    {t("signup_login_link")}
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

export default SignUp;
