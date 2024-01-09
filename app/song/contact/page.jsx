"use client";
import React, { useRef, useState } from "react";
import { rajdhani } from "@/components/ui/fonts";
import clsx from "clsx";
import emailjs from "@emailjs/browser";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const emailjsPublicKey = "BRpCzUI0MwvVUI2Vs";
  const emailjsTemplateID = "template_p5nstyt";
  const emailjsServiceID = "service_6a9uc18";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log("Submitting form...");
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        emailjsServiceID,
        emailjsTemplateID,
        {
          from_name: form.name,
          to_name: "This Song",
          reply_to: form.email,
          to_email: "admin@thissong.app",
          message: form.message
        },
        emailjsPublicKey
      )
      .then(
        () => {
          console.log("Message sent successfully!");
          setLoading(false);
          toast({
            title: "Message sent successfully:",
            description: (
              <p className="mt-2 w-[340px] rounded-md p-4">
                Thank you for contacting us! We will get back to you as soon as
                possible.
              </p>
            )
          });
        },
        (error) => {
          setLoading(false);
          toast({
            title: "Failed to send message:",
            description: (
              <p className="mt-2 w-[340px] rounded-md p-4">
                An error occurred while sending your message. Please try again
                later, or email us directly at{" "}
                <a
                  href="mailto:admin@thissong.app"
                  className="hover:underline hover:brightness-150"
                >
                  admin@thissong.app
                </a>
                .
              </p>
            )
          });

          console.log(error);
        }
      );
  };

  return (
    <div
      className={clsx(rajdhani.className, "max-w-4xl p-4 mx-auto contact-page")}
    >
      <Toaster />
      <h2 className="mb-6 text-3xl font-bold text-center text-primary">
        Contact Us
      </h2>

      <section className="mb-6">
        <h3 className="mb-3 text-2xl font-semibold text-primary">
          Get in Touch
        </h3>
        <p className="mb-4 leading-relaxed text-muted">
          Have questions, feedback, or just want to say hello? Reach out to us
          using the form below, or email us directly.
        </p>

        {/* Contact Form */}
        <div className="contact-form">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-primary"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-primary focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                maxLength={500}
                placeholder="Your Name"
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-primary"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-primary focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                maxLength={500}
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-primary"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-primary focus:outline-none focus:shadow-outline"
                id="message"
                name="message"
                rows="7"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                disabled={loading}
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit" disabled={loading} className="w-24">
                {loading ? (
                  <span className="w-5 h-5 border-b-2 rounded-full animate-spin border-text" />
                ) : (
                  <>
                    Submit
                    {/* <FaPaperPlane className="text-xs transition-transform duration-500 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1" />{" "} */}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Additional Contact Information */}
      <section className="mb-6">
        <h3 className="mb-3 text-2xl font-semibold text-primary">
          Other Ways to Reach Us
        </h3>
        <p className="leading-relaxed text-muted">
          Email:{" "}
          <a
            href="mailto:admin@thissong.app"
            className="hover:underline hover:brightness-150"
          >
            admin@thissong.app
          </a>
        </p>
        {/* <p className="leading-relaxed text-muted">
          Follow us on social media: [Social Media Links]
        </p> */}
      </section>
    </div>
  );
};

export default ContactPage;
