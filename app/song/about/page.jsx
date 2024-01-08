import React from "react";
import { rajdhani } from "@/components/ui/fonts";

const AboutPage = () => {
  return (
    <div className="max-w-5xl p-4 mx-auto about-page">
      {/* <h2 className="mb-5 text-3xl font-bold text-center text-primary">
        About Us
      </h2> */}

      {/* Header Image */}
      <div className="max-w-3xl mx-auto mb-5 header-image">
        {/* Replace with actual image component or path */}
        <img
          src="/images/this-song-full.png"
          alt="This Song - AI-Enhanced Lyric Analysis"
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Our Mission Section */}
      <section className="mb-6 our-mission">
        <h3 className="mb-3 text-2xl font-semibold text-primary">
          Our Mission
        </h3>
        <p className="leading-relaxed text-muted">
          This Song was born out of a desire to engage with song lyrics on a
          thematic and historical level and thus spark a deeper understanding of
          the music we listen to. Our mission is to uncover the layers of
          meaning in each song using artificial intelligence and share them with
          music lovers around the world. We strive to provide a fuller knowledge
          of your favorite songs, connecting you with the emotions, allusions,
          and literary devices embedded in the lyrics of a song as a whole and
          indivisible art object.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="mb-6 what-we-do">
        <h3 className="mb-3 text-2xl font-semibold text-primary">What We Do</h3>
        <ul className="space-y-2 list-disc list-inside text-muted">
          <li>
            Song Meanings: Dive into a comprehensive library of song
            interpretations, where each song&apos;s lyrics are analyzed to
            reveal the hidden messages, historical context, and artistic
            nuances.
          </li>
          <li>
            Spotify Integration: Seamlessly connect your Spotify account to
            access your favorite songs, discover the meanings of your recently
            played tracks, and see what you&apos;re listening to right now.
          </li>
          <li>
            Instant Interpretations: Get instant access to the meaning of any
            song, even those not yet in our library&mdash;just search for it and
            our AI assistants will do the rest.
          </li>
          <li>
            Personalized Experience (coming soon): Save your favorite songs,
            follow artists, and receive updates on new interpretations and
            features.
          </li>
        </ul>
      </section>

      {/* Our Journey Section */}
      <section className="mb-6 our-journey">
        <h3 className="mb-3 text-2xl font-semibold text-primary">
          Our Journey
        </h3>
        <p className="leading-relaxed text-muted">
          This Song was founded in 2023 by a group of lyrics enthusiasts and
          tech innovators. Excited by the idea of leveraging artificial
          intelligence to explore song meanings with a precision and speed
          hitherto impossible, we set out to create a platform that not only
          deciphers lyrics but also celebrates the art of music. We are
          committed to providing the best possible experience for our users and
          are constantly working to improve our product. We hope you enjoy
          exploring the world of lyrics with us!
        </p>
      </section>

      {/* Get In Touch Section */}
      <section className="mb-6 get-in-touch">
        <h3 className="mb-3 text-2xl font-semibold text-primary">
          Get In Touch
        </h3>
        <p className="leading-relaxed text-muted">
          We love hearing from our users! Whether you have feedback, ideas, or
          just want to share your favorite song story, feel free to reach out to
          us at{" "}
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
  );
};

export default AboutPage;
