import { getSiteSettings } from "@/lib/sanity/fetch";
import { HeaderClient } from "./header-client";

export async function Header() {
  const siteSettings = await getSiteSettings();

  return <HeaderClient siteSettings={siteSettings} />;
}
