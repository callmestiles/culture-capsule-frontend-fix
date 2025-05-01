import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const contributionSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().optional(),
  year: z.string().optional(),
  image: z.any().optional(),
  language: z.string().optional(),
});

type ContributionValues = z.infer<typeof contributionSchema>;

const Contribute = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ContributionValues>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      title: "",
      content: "",
      location: "",
      year: "",
      language: language,
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to contribute",
        variant: "destructive",
      });
    }
  }, [authLoading, isAuthenticated, toast]);

  const onSubmit = async (values: ContributionValues) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to contribute",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("location", values.location || "");
    formData.append("year", values.year || "");
    formData.append("language", values.language || "en");

    if (values.image && values.image.length > 0) {
      for (let i = 0; i < values.image.length; i++) {
        formData.append("image", values.image[i]);
      }
    }

    try {
      const response = await axios.post(
        "https://culture-capsule-backend.onrender.com/api/posts",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("Response:", response.data);

      // if (response.data.success) {
      //   const postId = response.data.post._id;
      //   setTimeout(async () => {
      //     try {
      //       const postRes = await axios.get(
      //         `https://culture-capsule-backend.onrender.com/api/posts/${postId}`,
      //         {
      //           withCredentials: true,
      //           headers: {
      //             Authorization: `Bearer ${localStorage.getItem(
      //               "accessToken"
      //             )}`,
      //           },
      //         }
      //       );
      //       if (postRes.data.status === "approved") {
      //         toast({
      //           title: "Post submitted successfully",
      //           description: "Thank you for preserving cultural heritage.",
      //         });
      //         setIsUploading(false);
      //       }
      //     } catch (error) {
      //       console.error("Error adding author to post:", error.status);
      //       if (error.status === 404) {
      //         toast({
      //           title: "Post rejected",
      //           description: "Your contribution has been regarded as spam.",
      //         });
      //       }
      //       setIsUploading(false);
      //       return;
      //     }
      //     form.reset();
      //   }, 5000);
      // } else {
      //   throw new Error(response.data.message || "Submission failed");
      // }
    } catch (error) {
      toast({
        title: "Submission failed",
        description:
          error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAuthPrompt = () => {
    navigate("/login", { state: { from: "/contribute" } });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-capsule-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-capsule-accent mx-auto mb-4"></div>
          <p>Getting authentication status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-capsule-bg">
      <Navbar />

      <main className="pt-20 pb-20">
        <div className="capsule-container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
                {t("contribute_pill")}
              </div>
              <h1 className="text-3xl text-black md:text-4xl font-serif font-semibold mb-4">
                {t("contribute_title")}
              </h1>
              <p className="text-capsule-text/80 leading-relaxed">
                {t("contribute_description")}
              </p>
            </div>

            {isAuthenticated ? (
              <div className="bg-white rounded-xl shadow-capsule p-6 md:p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contribute_formOne_title")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("contribute_formOne_placeholder")}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {t("contribute_formOne_description")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t("contribute_formTwo_title")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t(
                                  "contribute_formTwo_placeholder"
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {t("contribute_formTwo_description")}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t("contribute_formThree_title")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t(
                                  "contribute_formThree_placeholder"
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {t("contribute_formThree_description")}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("contribute_formFour_title")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("contribute_formFour_placeholder")}
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {t("contribute_formFour_description")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("contribute_formFive_title")}
                          </FormLabel>
                          <div className="border-2 border-dashed border-capsule-text/20 rounded-lg p-8 text-center hover:border-capsule-accent/50 transition-colors">
                            <Upload
                              size={32}
                              className="mx-auto mb-3 text-capsule-text/40"
                            />
                            <p className="text-capsule-text/60 mb-2">
                              {t("contribute_formFive_placeholderOne")}
                            </p>
                            <p className="text-xs text-capsule-text/50">
                              {t("contribute_formFive_placeholderTwo")}
                            </p>
                            <input
                              type="file"
                              multiple
                              className="hidden"
                              id="media-upload"
                              onChange={(e) => field.onChange(e.target.files)}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="mt-4"
                              onClick={() =>
                                document.getElementById("media-upload")?.click()
                              }
                            >
                              {t("contribute_formFive_description_btn")}
                            </Button>
                          </div>
                          <FormDescription>
                            {t("contribute_formFive_description")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-capsule-accent hover:bg-capsule-accent/90"
                        disabled={isUploading}
                      >
                        {isUploading
                          ? `${t("contribute_formSubmitBtnLoading")}`
                          : `${t("contribute_formSubmitBtn")}`}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-capsule p-8 text-center">
                <div className="w-16 h-16 bg-capsule-paper rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload size={28} className="text-capsule-accent" />
                </div>

                <h2 className="text-xl text-black font-serif font-semibold mb-2">
                  {t("auth_required_title")}
                </h2>

                <p className="text-capsule-text/70 mb-6 max-w-md mx-auto">
                  {t("auth_required_description")}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={handleAuthPrompt}
                    className="bg-capsule-accent hover:bg-capsule-accent/90"
                  >
                    {t("login")}
                  </Button>

                  <Link to="/signup">
                    <Button variant="outline" className="text-black">
                      {t("signup")}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contribute;
