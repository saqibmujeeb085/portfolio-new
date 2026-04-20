"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ServiceSelect } from "@/components/forms/service-select";
import {
  contactFormSchema,
  type ContactFormValues,
  serviceOptions,
} from "@/lib/validations/contact";
import { useReCaptcha } from "@/hooks/use-recaptcha";
import { Shield } from "lucide-react";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { executeRecaptcha } = useReCaptcha();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: undefined,
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha("contact_form");

      if (!recaptchaToken) {
        alert(
          "reCAPTCHA verification failed. Please refresh the page and try again."
        );
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit form");
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again."
      );
    }
  };

  return (
    <div className="rounded-[32px] border border-surface-border bg-card p-6 text-card-foreground shadow-[var(--shadow-soft)] md:p-8">
      <div className="mb-8">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
          Contact Form
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          Start your next project with us
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/65 md:text-base">
          Tell us a bit about your project, goals, and the kind of support you
          need. We’ll get back to you with the right next steps.
        </p>
      </div>

      {isSubmitted ? (
        <div className="rounded-[24px] border border-surface-border bg-secondary p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-foreground/50">
            Message Sent
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
            Thanks — we’ve received your inquiry.
          </h3>
          <p className="mt-3 text-sm leading-6 text-foreground/65 md:text-base">
            Our team will review your message and reach out soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-foreground/80"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                className="h-13 w-full rounded-[18px] border border-surface-border bg-transparent px-4 text-sm outline-none transition focus:border-foreground/25"
                placeholder="Enter first name"
              />
              {errors.firstName ? (
                <p className="mt-2 text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-foreground/80"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                className="h-13 w-full rounded-[18px] border border-surface-border bg-transparent px-4 text-sm outline-none transition focus:border-foreground/25"
                placeholder="Enter last name"
              />
              {errors.lastName ? (
                <p className="mt-2 text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground/80"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="h-13 w-full rounded-[18px] border border-surface-border bg-transparent px-4 text-sm outline-none transition focus:border-foreground/25"
                placeholder="Enter email address"
              />
              {errors.email ? (
                <p className="mt-2 text-xs text-red-500">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-foreground/80"
              >
                Contact Number
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className="h-13 w-full rounded-[18px] border border-surface-border bg-transparent px-4 text-sm outline-none transition focus:border-foreground/25"
                placeholder="Enter contact number"
              />
              {errors.phone ? (
                <p className="mt-2 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              ) : null}
            </div>
          </div>

          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <ServiceSelect
                label="Select Service"
                options={serviceOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.service?.message}
              />
            )}
          />

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-foreground/80"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              {...register("message")}
              className="w-full rounded-[18px] border border-surface-border bg-transparent px-4 py-4 text-sm outline-none transition focus:border-foreground/25"
              placeholder="Tell us about your project"
            />
            {errors.message ? (
              <p className="mt-2 text-xs text-red-500">
                {errors.message.message}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            data-cursor="accent"
            className="ds-button ds-button-primary h-12 px-6 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>

          {/* reCAPTCHA Badge Info */}
          <div className="flex items-center gap-2 text-xs text-foreground/50">
            <Shield className="h-3 w-3" />
            <p>
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground/70"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground/70"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
