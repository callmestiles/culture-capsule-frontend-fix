import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { X } from "lucide-react";

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
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);

    // Filter out files that are too large
    const validFiles = fileArray.filter((file) => {
      if (file.size > 20 * 1024 * 1024) {
        // 20MB in bytes
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 20MB limit and was not added.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const newImageFiles = [...imageFiles, ...validFiles];
    setImageFiles(newImageFiles);

    // Create preview URLs
    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      // Reset the input value to allow selecting the same file again
      e.target.value = "";
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const files = Array.from(e.target.files);
  //     const newImageFiles = [...imageFiles, ...files];
  //     setImageFiles(newImageFiles);

  //     // Create preview URLs
  //     const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
  //     setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
  //   }
  // };

  const removeImage = (index: number) => {
    const newPreviewImages = [...previewImages];
    const newImageFiles = [...imageFiles];
    URL.revokeObjectURL(newPreviewImages[index]);
    newPreviewImages.splice(index, 1);
    newImageFiles.splice(index, 1);
    setPreviewImages(newPreviewImages);
    setImageFiles(newImageFiles);
  };

  const form = useForm<ContributionValues>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      title: "",
      content: "",
      location: "",
      year: "",
      language: language,
    },
    mode: "onChange",
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

    //add multiple images under the key of image(the previewed uploaded images)
    imageFiles.forEach((file) => {
      formData.append("image", file);
    });

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

      toast({
        title: "Submission successful",
        description: "Your contribution has been received.",
      });

      form.reset();
      setPreviewImages([]);
      setImageFiles([]);

      // Note: The commented polling code has been removed for clarity
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

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const handleAuthPrompt = () => {
    navigate("/login", { state: { from: "/contribute" } });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-capsule-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-capsule-accent mx-auto mb-4"></div>
          <p>Please wait...</p>
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

                    <FormItem>
                      <FormLabel>{t("contribute_formFive_title")}</FormLabel>

                      {/* Image previews */}
                      {previewImages.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                          {previewImages.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`Preview ${index}`}
                                className="w-full h-28 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-col gap-4">
                        {/* Drag and drop area */}
                        <div
                          className={`relative border-2 border-dashed rounded-lg transition-colors ${
                            dragActive
                              ? "border-capsule-accent bg-capsule-accent/10"
                              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                          }`}
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                        >
                          <label className="flex flex-col items-center justify-center w-full h-32 cursor-pointer">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload
                                className={`w-8 h-8 mb-3 ${
                                  dragActive
                                    ? "text-capsule-accent"
                                    : "text-gray-500"
                                }`}
                              />
                              <p className="mb-2 text-sm text-gray-500">
                                {t("contribute_formFive_placeholderOne")}
                              </p>
                              <p className="text-xs text-gray-500">
                                {t("contribute_formFive_placeholderTwo")}
                              </p>
                            </div>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                          {dragActive && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg pointer-events-none">
                              <div className="bg-capsule-accent text-white px-4 py-2 rounded-md">
                                {t("contribute_formFive_placeholderThree")}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <FormDescription>
                        {t("contribute_formFive_description")}
                      </FormDescription>
                    </FormItem>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-capsule-accent hover:bg-capsule-accent/90"
                        disabled={isUploading || !form.formState.isValid}
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
