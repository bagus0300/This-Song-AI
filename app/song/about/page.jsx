import React from "react";
import { rajdhani } from "@/components/ui/fonts";
import clsx from "clsx";

export const metadata = {
  title: "This Song | About",
  description: "AI-enhanced analysis of lyrics for songs on Spotify."
};

const AboutPage = () => {
  return (
    <div className={clsx(rajdhani.className, "", "about-page")}>
      {/* <h2 className="mb-5 text-3xl font-bold text-center text-primary">
        About Us
      </h2> */}

      <div className="w-full pb-14 bg-secondary">
        {/* Header Image */}
        <div className="max-w-3xl mx-auto mb-5 header-image">
          {/* Replace with actual image component or path */}
          <img
            src="/images/this-song-full.png"
            width={768}
            height={512}
            alt="This Song - AI-Enhanced Lyric Analysis"
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="max-w-5xl p-4 mx-auto my-7">
        {/* Our Mission Section */}
        <section className="mb-7 about-us">
          <h3 className="mb-3 text-3xl font-semibold text-primary">About Us</h3>
          <p className="text-lg leading-relaxed text-muted">
            This Song was born out of a desire to engage with song lyrics on a
            thematic and historical level and thus spark a deeper understanding
            of the music we listen to. Our mission is to uncover the layers of
            meaning in each song using artificial intelligence and share them
            with music lovers around the world. We strive to provide a fuller
            knowledge of your favorite songs, connecting you with the emotions,
            allusions, and literary devices embedded in the lyrics of a song as
            a whole and indivisible art object.
          </p>
        </section>

        {/* What We Do Section */}
        <section className="mb-7 what-we-do">
          <h3 className="mb-3 text-3xl font-semibold text-primary">
            What We Do
          </h3>
          <ul className="space-y-2 text-lg list-disc list-inside text-muted">
            <li>
              <span className="font-bold">Song Meanings</span>: Dive into a
              comprehensive library of song interpretations, where each
              song&apos;s lyrics are analyzed to reveal its hidden messages,
              historical context, and artistic nuances.
            </li>
            <li>
              <span className="font-bold">Spotify Integration</span>: Seamlessly
              connect your Spotify account to access your favorite songs,
              discover the meanings of your recently played tracks, and see what
              you&apos;re listening to right now.
            </li>
            <li>
              <span className="font-bold">Instant Interpretations</span>: Get
              instant access to the meaning of any song, even those not yet in
              our library &mdash; just search for it and our AI assistants will
              do the rest.
            </li>
            <li>
              <span className="font-bold">Multilingual Understanding</span>:
              Explore song interpretations that transcend language barriers. Our
              platform offers English insights into songs from various
              languages, ensuring you can connect with the music you love,
              regardless of its linguistic origin.
            </li>
            <li>
              <span className="font-bold">Personalized Experience</span> (coming
              soon): Save your favorite songs, follow artists, and receive
              updates on new interpretations and features.
            </li>
          </ul>
        </section>

        {/* Our Journey Section */}
        <section className="mb-7 our-journey">
          <h3 className="mb-3 text-3xl font-semibold text-primary">
            Our Journey
          </h3>
          <p className="text-lg leading-relaxed text-muted">
            This Song was founded in 2023; excited by the idea of leveraging
            artificial intelligence to explore song meanings with a precision
            and speed hitherto impossible, we set out to create a platform that
            not only deciphers lyrics but also celebrates the art of lyricism.
            We are committed to providing the best possible experience for our
            users and are constantly working to improve our product. We hope you
            enjoy exploring the world of lyrics with us!
          </p>
        </section>

        {/* Get In Touch Section */}
        <section className="get-in-touch">
          <h3 className="mb-3 text-3xl font-semibold text-primary">
            Get In Touch
          </h3>
          <p className="text-lg leading-relaxed text-muted">
            We love hearing from our users! Whether you have feedback, ideas, or
            just want to share your favorite song story, feel free to reach out
            to us at{" "}
            <a
              href="mailto:info@thissong.com"
              className="text-primary hover:underline"
            >
              info@thissong.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
