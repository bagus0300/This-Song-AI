import clsx from "clsx";
import React from "react";
import { rajdhani } from "./fonts";

const Footer = () => {
  return (
    <footer className={clsx(rajdhani.className, "bg-secondary")}>
      <div className="max-w-screen-xl px-4 py-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 pt-8 mb-10 text-center sm:text-end sm:grid-cols-2 lg:grid-cols-2">
          <div></div>
          <div>
            <p className="text-lg font-semibold tracking-widest text-primary">
              This Song
            </p>

            <ul className="text-base">
              <li>
                <a href="/" className="transition text-muted hover:opacity-75">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="transition text-muted hover:opacity-75"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="transition text-muted hover:opacity-75"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                {/* <a
                  href="mailto:admin@thissong.app"
                  className="transition text-muted hover:opacity-75"
                >
                  Contact
                </a> */}
                <a
                  href="/contact"
                  className="transition text-muted hover:opacity-75"
                >
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="transition text-muted hover:opacity-75">
                  {/* About */}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-end">
          <p className="text-sm text-muted">
            All songs, lyrics, and images are property of their respective
            owners.
          </p>
          <p className="text-sm text-muted">
            &copy; 2024. This Song. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
