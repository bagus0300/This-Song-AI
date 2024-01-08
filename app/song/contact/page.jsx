import React from "react";
import { rajdhani } from "@/components/ui/fonts";
import clsx from "clsx";

export const metadata = {
  title: "This Song | About",
  description: "AI-enhanced analysis of lyrics for songs on Spotify."
};

const AboutPage = () => {
  return (
    <div
      className={clsx(
        rajdhani.className,
        "",
        "max-w-5xl p-4 mx-auto about-page"
      )}
    >
      <h2 className="mb-6 text-3xl font-bold text-center text-primary">
        Contact Us
      </h2>

      <section className="mb-6">
        <h3 className="mb-3 text-2xl font-semibold text-primary">
          Get in Touch
        </h3>
        <p className="mb-4 text-lg leading-relaxed text-muted">
          Have questions, feedback, or just want to say hello? Reach out to via
          email at{" "}
          <a
            href="mailto:admin@thissong.app"
            className="hover:brightness-150 hover:underline"
          >
            admin@thissong.app
          </a>
        </p>
      </section>

      {/* <section className="mb-6">
        <h3 className="mb-3 text-2xl font-semibold text-primary">
          Other Ways to Reach Us
        </h3>
        <p className="leading-relaxed text-muted">
          Email:{" "}
          <a
            href="mailto:admin@thissong.app"
            className="hover:brightness-150 hover:underline"
          >
            admin@thissong.app
          </a>
        </p>
        <p className="leading-relaxed text-muted">Follow us on social media:</p>
      </section> */}
    </div>
  );
};

export default AboutPage;
