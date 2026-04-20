"use client";

import { useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export function useReCaptcha() {
  const executeRecaptcha = useCallback(
    async (action: string = "submit"): Promise<string | null> => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (!siteKey) {
        console.warn("reCAPTCHA site key not configured");
        return null;
      }

      if (typeof window === "undefined" || !window.grecaptcha) {
        console.warn("reCAPTCHA not loaded");
        return null;
      }

      try {
        return await new Promise<string>((resolve) => {
          window.grecaptcha.ready(async () => {
            const token = await window.grecaptcha.execute(siteKey, { action });
            resolve(token);
          });
        });
      } catch (error) {
        console.error("reCAPTCHA execution error:", error);
        return null;
      }
    },
    []
  );

  return { executeRecaptcha };
}
