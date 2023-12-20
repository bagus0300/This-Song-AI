"use client";
import clsx from "clsx";
import React from "react";

const ConditionalModal = ({ modalOpen = false, children }) => {
  return (
    <>
      {/* <div
        className={clsx(
          modalOpen &&
            "fixed top-0 left-0 w-full h-[100vh] bg-[rgba(0,0,0,0.7)]"
        )}
        onClick={() => {
          alert("Clicked");
        }}
      /> */}
      <dialog
        open={modalOpen}
        className={clsx(
          "w-full h-[calc(100dvh-56px-40px)] rounded-lg transition-all duration-300 ease-out bg-card"
        )}
      >
        {children}
      </dialog>
    </>
  );
};

export default ConditionalModal;
