"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// We'll use react-icons for stability
import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6"; // FontAwesome 6 brands
import { FiZap, FiSend, FiMail, FiMessageSquare } from "react-icons/fi"; // Feather icons (identical to Lucide style)

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Footer() {
  const newsletterForm = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const contactForm = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onNewsletterSubmit = (data: z.infer<typeof newsletterSchema>) => {
    console.log("Newsletter:", data);
    toast.success("Welcome to the inner circle! 🔥");
    newsletterForm.reset();
  };

  const onContactSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log("Contact:", data);
    toast.success("Message sent! A coach will reach out soon.");
    contactForm.reset();
  };

  const socialLinks = [
    { Icon: FaInstagram, href: "#" },
    { Icon: FaXTwitter, href: "#" },
    { Icon: FaFacebookF, href: "#" },
    { Icon: FaYoutube, href: "#" },
    { Icon: FaLinkedinIn, href: "#" },
  ];

  return (
    <footer className="bg-card border-t pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Socials */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <FiZap className="w-5 h-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight">nova</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transforming general fitness into visual data. Track, analyze, and
              conquer your goals with our pro ecosystem.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <FiMail className="w-5 h-5 text-primary" /> Weekly nova
            </h3>
            <p className="text-sm text-muted-foreground">
              Get science-based fitness tips and early access to new features.
            </p>
            <form
              onSubmit={newsletterForm.handleSubmit(onNewsletterSubmit)}
              className="flex gap-2"
            >
              <Input
                {...newsletterForm.register("email")}
                placeholder="email@example.com"
                className="rounded-full bg-muted border-none"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full shrink-0"
              >
                <FiSend className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-5 bg-muted/50 p-6 rounded-3xl border border-border/50">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FiMessageSquare className="w-5 h-5 text-primary" /> Contact
              Support
            </h3>
            <form
              onSubmit={contactForm.handleSubmit(onContactSubmit)}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <Input
                  {...contactForm.register("name")}
                  placeholder="Name"
                  className="bg-background border-none shadow-none focus-visible:ring-1"
                />
                <Input
                  {...contactForm.register("email")}
                  placeholder="Email"
                  className="bg-background border-none shadow-none focus-visible:ring-1"
                />
              </div>
              <Textarea
                {...contactForm.register("message")}
                placeholder="How can we help?"
                className="bg-background border-none resize-none h-20 shadow-none focus-visible:ring-1"
              />
              <Button type="submit" className="w-full rounded-xl">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 nova Fitness. Built with precision for the community.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
