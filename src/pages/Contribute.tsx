import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Upload,
  Book,
  Utensils,
  Palette,
  Music,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contributionSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().optional(),
  year: z.string().optional(),
  mediaFiles: z.any().optional(),
});

type ContributionValues = z.infer<typeof contributionSchema>;

const Contribute = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // For demonstration purposes - in a real app, this would be a proper auth check
  React.useEffect(() => {
    // Simulate checking if user is logged in
    const checkAuth = () => {
      // This is just a stub - in a real app, you'd check for a token or session
      const fakeAuthCheck = localStorage.getItem("isLoggedIn") === "true";
      setIsAuthenticated(fakeAuthCheck);
    };

    checkAuth();
  }, []);

  const form = useForm<ContributionValues>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      location: "",
      year: "",
    },
  });

  const onSubmit = (values: ContributionValues) => {
    setIsUploading(true);
    console.log("Contribution form submitted:", values);

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);

      toast({
        title: "Contribution submitted successfully!",
        description: "Thank you for preserving cultural heritage.",
      });

      // Reset form
      form.reset();

      // Redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 2000);
  };

  // Redirect to login if not authenticated
  const handleAuthPrompt = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-capsule-bg">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="capsule-container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="inline-block px-3 py-1 bg-capsule-sand rounded-full text-sm font-medium mb-4">
                Contribute
              </div>
              <h1 className="text-3xl text-black md:text-4xl font-serif font-semibold mb-4">
                Share Cultural Heritage
              </h1>
              <p className="text-capsule-text/80 leading-relaxed">
                Help preserve the rich cultural heritage of North Cyprus by
                contributing stories, recipes, arts, or folklore that you've
                learned or experienced.
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
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Give your contribution a descriptive title"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Choose a clear title that describes what you're
                            sharing.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="historical-events">
                                <div className="flex items-center gap-2">
                                  <Book
                                    size={16}
                                    className="text-capsule-accent"
                                  />
                                  <span>Historical Events</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="local-recipes">
                                <div className="flex items-center gap-2">
                                  <Utensils
                                    size={16}
                                    className="text-capsule-accent"
                                  />
                                  <span>Local Recipes</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="arts-crafts">
                                <div className="flex items-center gap-2">
                                  <Palette
                                    size={16}
                                    className="text-capsule-accent"
                                  />
                                  <span>Arts & Crafts</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="folklore-stories">
                                <div className="flex items-center gap-2">
                                  <Book
                                    size={16}
                                    className="text-capsule-accent"
                                  />
                                  <span>Folklore & Stories</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="music-dance">
                                <div className="flex items-center gap-2">
                                  <Music
                                    size={16}
                                    className="text-capsule-accent"
                                  />
                                  <span>Music & Dance</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the category that best fits your
                            contribution.
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
                            <FormLabel>Location (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Famagusta, Kyrenia, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Where this cultural element originated or is
                              practiced.
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
                            <FormLabel>Year/Period (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., 1950s, 19th century, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              The time period relevant to your contribution.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the cultural item, story, recipe, etc. in detail..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide as much detail as possible to preserve this
                            cultural knowledge.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mediaFiles"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Media (Optional)</FormLabel>
                          <div className="border-2 border-dashed border-capsule-text/20 rounded-lg p-8 text-center hover:border-capsule-accent/50 transition-colors">
                            <Upload
                              size={32}
                              className="mx-auto mb-3 text-capsule-text/40"
                            />
                            <p className="text-capsule-text/60 mb-2">
                              Drag and drop files here, or click to browse
                            </p>
                            <p className="text-xs text-capsule-text/50">
                              Supported formats: JPG, PNG, MP3, MP4 (Max 20MB)
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
                              Browse Files
                            </Button>
                          </div>
                          <FormDescription>
                            Upload photos, audio, or video related to your
                            contribution.
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
                        {isUploading ? "Submitting..." : "Submit Contribution"}
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
                  Authentication Required
                </h2>

                <p className="text-capsule-text/70 mb-6 max-w-md mx-auto">
                  You need to be logged in to contribute to our cultural
                  preservation efforts. Please log in or create an account to
                  continue.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={handleAuthPrompt}
                    className="bg-capsule-accent hover:bg-capsule-accent/90"
                  >
                    Log In
                  </Button>

                  <Link to="/signup">
                    <Button variant="outline" className="text-black">
                      Create Account
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
