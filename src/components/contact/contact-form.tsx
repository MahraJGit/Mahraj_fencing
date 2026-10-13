"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a phone number"),
  company: z.string().optional(),
  message: z.string().min(10, "Tell us a bit about your project"),
});

type FormValues = z.infer<typeof schema>;

type FieldErrors = Partial<Record<keyof FormValues, string>>;

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="rounded-lg border border-border bg-surface-alt p-8 text-center"
        role="status"
      >
        <h3 className="text-xl font-semibold text-ink">Message received</h3>
        <p className="mt-2 text-sm text-body">
          Thanks {values.name.split(" ")[0]}. Our team will respond within one
          business day. For urgent sites, message us on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={values.name} onChange={handleChange} />
          {errors.name ? (
            <p className="text-xs text-brand">{errors.name}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={values.phone} onChange={handleChange} />
          {errors.phone ? (
            <p className="text-xs text-brand">{errors.phone}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email ? (
          <p className="text-xs text-brand">{errors.email}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company (optional)</Label>
        <Input
          id="company"
          name="company"
          value={values.company}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Project details</Label>
        <Textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Fence type, approximate length, location, target dates…"
        />
        {errors.message ? (
          <p className="text-xs text-brand">{errors.message}</p>
        ) : null}
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
}
