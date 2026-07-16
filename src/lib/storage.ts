import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuid } from "uuid";
import { put, del } from "@vercel/blob";

export interface StorageProvider {
  upload(file: File, folder: string): Promise<string>;
  delete(url: string): Promise<void>;
  getUrl(path: string): string;
}

class LocalStorageProvider implements StorageProvider {
  private basePath: string;
  private baseUrl: string;

  constructor() {
    this.basePath = join(process.cwd(), "public", "uploads");
    this.baseUrl = "/uploads";
  }

  async upload(file: File, folder: string): Promise<string> {
    const dir = join(this.basePath, folder);
    await mkdir(dir, { recursive: true });
    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${uuid()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(join(dir, filename), buffer);
    return `${this.baseUrl}/${folder}/${filename}`;
  }

  async delete(url: string): Promise<void> {
    const filePath = join(process.cwd(), "public", url);
    try {
      await unlink(filePath);
    } catch (err) {
      console.error(`Failed to delete file: ${filePath}`, err);
    }
  }

  getUrl(path: string): string {
    if (path.startsWith("http")) return path;
    return path;
  }
}

class VercelBlobStorageProvider implements StorageProvider {
  async upload(file: File, folder: string): Promise<string> {
    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${folder}/${uuid()}.${ext}`;
    const { url } = await put(filename, file, { access: "public" });
    return url;
  }

  async delete(url: string): Promise<void> {
    await del(url);
  }

  getUrl(path: string): string {
    return path;
  }
}

export const storage: StorageProvider =
  process.env.STORAGE_PROVIDER === "vercel-blob"
    ? new VercelBlobStorageProvider()
    : new LocalStorageProvider();

export function getStorageProvider(): StorageProvider {
  const provider = process.env.STORAGE_PROVIDER ?? "local";
  if (provider === "vercel-blob") {
    return new VercelBlobStorageProvider();
  }
  return new LocalStorageProvider();
}
