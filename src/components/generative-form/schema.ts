import * as Yup from "yup";

const MAX_FILE_SIZE = 102400; // 100KB

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
} as const;

type FileType = keyof typeof validFileExtensions;
type ImageFileExtension = (typeof validFileExtensions.image)[number];

function isValidFileType(
  fileName: string | undefined,
  fileType: FileType
): boolean {
  if (!fileName) return false;
  const fileExtension = fileName.split(".").pop() as ImageFileExtension;
  return validFileExtensions[fileType].includes(fileExtension);
}

export const GerativeFormSchema = Yup.object().shape({
  background: Yup.string().required("Background is required"),
  selfie: Yup.mixed<File>()
    .required("A file is required")
    .test("is-valid-type", "Not a valid image type", (value) => {
      const file = value as File | null;
      return isValidFileType(file?.name.toLowerCase(), "image");
    })
    .test("is-valid-size", "Max allowed size is 100KB", (value) => {
      const file = value as File | null;
      return file ? file.size <= MAX_FILE_SIZE : false;
    })
    .required("A file is required"),
});
