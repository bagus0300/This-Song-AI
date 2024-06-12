"use client";
import clsx from "clsx";
import React from "react";

const ConditionalModal = ({ modalOpen = false, children }) => {
  return (
    <>
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
