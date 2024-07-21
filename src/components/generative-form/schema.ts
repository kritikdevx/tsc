import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const generativeSchema = z.object({
  background: z
    .string()
    .refine((value) => value.trim().length > 0, "Background is required."),
  photo: z
    .any()
    .refine((files) => files?.length > 0, "Photo is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type GenerativeFormValues = z.infer<typeof generativeSchema>;
