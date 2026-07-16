const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];

export function validateImageFile(
  file: File,
  maxSize: number
): string | null {
  if (file.size === 0) return null;

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return `Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(", ")}`;
  }

  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return `Invalid file extension. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}`;
  }

  if (file.size > maxSize) {
    const maxMB = maxSize / (1024 * 1024);
    return `File size exceeds ${maxMB}MB limit.`;
  }

  return null;
}

export function validateString(
  value: string,
  fieldName: string,
  options: { required?: boolean; maxLength?: number } = {}
): string | null {
  const { required = true, maxLength } = options;

  if (!value?.trim()) {
    if (required) return `${fieldName} is required.`;
    return null;
  }

  if (maxLength && value.trim().length > maxLength) {
    return `${fieldName} must be ${maxLength} characters or fewer.`;
  }

  return null;
}
