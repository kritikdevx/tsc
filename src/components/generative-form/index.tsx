"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { generativeSchema, GenerativeFormValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import backgrounds from "~/lib/backgrounds";
import Image from "next/image";
import { cn } from "~/lib/utils";

export default function GenerativeForm() {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GenerativeFormValues>({
    resolver: zodResolver(generativeSchema),
    defaultValues: {
      background: backgrounds[0].id,
      photo: [],
    },
  });

  const onSubmit: SubmitHandler<GenerativeFormValues> = async (data) => {
    const formData = new FormData();
    formData.append("background", data.background);
    formData.append("photo", data.photo[0]);

    const res = await fetch("http://localhost:3000/api/generate-photo", {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
      },
      body: formData,
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4 w-full">
      <label htmlFor="photo" className="grid gap-y-2 text-sm font-medium">
        Photo
        <input
          id="photo"
          type="file"
          {...register("photo")}
          accept="image/jpeg, image/jpg, image/png, image/webp"
        />
        {errors.photo && (
          <p className="text-red-500 text-sm">
            {errors.photo.message?.toString()}
          </p>
        )}
      </label>

      <label htmlFor="background" className="grid gap-y-2 text-sm font-medium">
        Background
        <div className="flex flex-wrap gap-2">
          {backgrounds.map((background) => (
            <label key={background.id} className="relative">
              <input
                id={background.id}
                type="radio"
                value={background.id}
                {...register("background")}
                className="sr-only"
              />
              <Image
                src={background.image}
                alt={`Background ${background.id}`}
                width={100}
                height={100}
                className={cn("cursor-pointer rounded-md", {
                  // get selected background
                  "ring-2 ring-blue-500": watch("background") === background.id,
                })}
              />
            </label>
          ))}
        </div>
        {errors.background && (
          <p className="text-red-500 text-sm">{errors.background.message}</p>
        )}
      </label>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
