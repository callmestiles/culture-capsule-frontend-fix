"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Camera, Edit, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BadgeCheck } from "lucide-react";
import type { User } from "@/lib/types";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSave = () => {
    // In a real app, you would save the changes to a server
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div
          className="relative h-32 w-32 cursor-pointer overflow-hidden rounded-full"
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
          onClick={handleImageClick}
        >
          <img
            src={
              profileImage || "/placeholder.svg?height=128&width=128&text=User"
            }
            alt={user.name}
            width={128}
            height={128}
            className="h-full w-full object-cover"
          />
          {isHoveringImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
              <Camera className="h-8 w-8" />
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="max-w-md"
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 flex items-center gap-1">
                {name}
                {user.name == "Daniel Adegoke" && (
                  <BadgeCheck className="h-6 w-6 text-blue-500" />
                )}
                <span></span>
              </h1>
              <p className="mb-4 text-gray-600">{bio}</p>
            </>
          )}

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{user.posts}</span>
              <span className="text-gray-600">Posts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{user.likes}</span>
              <span className="text-gray-600">Likes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">
                {user.contributions}
              </span>
              <span className="text-gray-600">Contributions</span>
            </div>
          </div>

          <div className="mt-6">
            {isEditing ? (
              <Button
                onClick={handleSave}
                className="bg-[rgb(82,104,45)] hover:bg-[rgb(65,85,35)]"
              >
                <Check className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="border-[rgb(82,104,45)] text-[rgb(82,104,45)] hover:bg-[rgba(82,104,45,0.1)]"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
