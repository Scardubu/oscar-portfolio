"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/app/lib/validations";
import type { z } from "zod";

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      inquiryType: "job",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = async (values: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(
          (data && data.message) || "Something went wrong. Please try again.",
        );
        return;
      }

      setStatus("success");
      reset();
    } catch (_) {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-2xl flex-col gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 shadow-xl backdrop-blur-sm lg:p-10"
      aria-label="Contact form"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-200">
            Name *
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-base text-white transition-all outline-none focus:border-accent-primary focus:bg-black/60 focus:ring-2 focus:ring-accent-primary/50"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-error">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-error">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="company"
            className="mb-1 block text-sm font-medium text-gray-200"
          >
            Company (optional)
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
            {...register("company")}
          />
        </div>

        <div>
          <label
            htmlFor="inquiryType"
            className="mb-1 block text-sm font-medium text-gray-200"
          >
            Inquiry type
          </label>
          <select
            id="inquiryType"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
            {...register("inquiryType")}
          >
            <option value="job">Job opportunity</option>
            <option value="consulting">Consulting / ML project</option>
            <option value="collaboration">Collaboration</option>
            <option value="other">Other</option>
          </select>
          {errors.inquiryType && (
            <p className="mt-1 text-xs text-error">{errors.inquiryType.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-gray-200"
        >
          How can Oscar help?
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-error">{errors.message.message}</p>
        )}
      </div>

      <div className="hidden">
        <label htmlFor="honeypot">Do not fill this field</label>
        <input
          id="honeypot"
          type="text"
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent-primary px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-accent-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>

      {status === "success" && (
        <p className="text-xs text-success">
          Message sent. Oscar will get back to you soon.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="text-xs text-error">{errorMessage}</p>
      )}
    </form>
  );
}
