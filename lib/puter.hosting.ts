import puter from "@heyputer/puter.js";
import { createHostingSlug, HOSTING_CONFIG_KEY } from "./utils";

export const getOrCreateHostingConfig =
  async (): Promise<HostingConfig | null> => {
    const existing = (await puter.kv.get(
      HOSTING_CONFIG_KEY,
    )) as HostingConfig | null;

    if (existing?.subdomain) {
      return { subdomain: existing.subdomain };
    }

    const subdomain = createHostingSlug();

    try {
      const created = await puter.hosting.create(subdomain, ".");
      return { subdomain: created.subdomain };
    } catch (error) {
      console.warn(`Could not find subdomain:${error}`);
      return null;
    }
  };

// takes blobs and uploads on puter subdomain

const uploadImageToHosting = async ({
  hosting,
  url,
  projectId,
  label,
}: StoreHostedImageParams): Promise<HostedAsset | null> => {};
