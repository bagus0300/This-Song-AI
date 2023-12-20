import clsx from "clsx";
import React from "react";

const ConditionalModal = ({ modalOpen = false, children }) => {
  return (
    <>
      <div
        className={clsx(
          modalOpen &&
            "fixed top-0 left-0 w-full h-[100vh] bg-[rgba(0,0,0,0.7)]"
        )}
      />
      <dialog open={modalOpen} className={clsx("w-full rounded-lg")}>
        {children}
      </dialog>
    </>
  );
};

export default ConditionalModal;
