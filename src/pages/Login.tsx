import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

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
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://culture-capsule-backend.onrender.com/api/auth/login",
        values
      );
      console.log("Login response:", response.data);
      if (response.data.success) {
        toast({
          title: "Login successful!",
          description: "You are now logged into your account.",
        });
        // Redirect to login page after successful signup
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast({
          title: "Login failed",
          description: response.data.message,
        });
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Please try again later.";

      toast({
        title: "Login failed",
        description: message,
      });
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }

    // Simulating successful login
    toast({
      title: "Successfully logged in!",
      description: "Welcome back to CultureCapsule.",
    });

    // Redirect to home page after successful login
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-capsule-bg flex flex-col">
      <div className="py-8 px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-capsule-text hover:text-capsule-accent transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-xl shadow-capsule p-8">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 mb-6"
            >
              <div className="w-10 h-10 relative rounded-full bg-capsule-accent flex items-center justify-center text-white overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-capsule-accent to-capsule-terracotta" />
                <span className="font-bold text-xl relative z-10">C</span>
              </div>
              <span className="font-serif text-xl font-semibold text-capsule-text tracking-tight">
                Culture Capsule
              </span>
            </Link>

            <h1 className="text-2xl text-black font-serif font-semibold mb-2">
              Welcome Back
            </h1>
            <p className="text-capsule-text/70">
              Log in to continue your cultural preservation journey
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
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
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="rounded border-capsule-text/30 text-capsule-accent focus:ring-capsule-accent"
                    onChange={(e) =>
                      form.setValue("rememberMe", e.target.checked)
                    }
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm text-capsule-text"
                  >
                    Remember me
                  </label>
                </div>

                <a
                  href="#forgot-password"
                  className="text-sm text-capsule-accent hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-capsule-accent hover:bg-capsule-accent/90"
              >
                Log In {loading && <Loader2 className="animate-spin ml-2" />}
              </Button>

              <div className="text-center mt-6">
                <p className="text-sm text-capsule-text/70">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-capsule-accent hover:underline"
                  >
                    Sign up
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
