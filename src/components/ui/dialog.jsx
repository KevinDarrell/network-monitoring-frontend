import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function cn(...classes) {
  return clsx(classes);
}

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

/* -------------------- Overlay -------------------- */
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "DialogOverlay fixed inset-0 z-40 bg-black/60 backdrop-blur-sm",
      "data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

/* -------------------- Content -------------------- */
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "DialogContent fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 outline-none",
        "w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 sm:p-8",
        // animasi smooth content
        "data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClose",
        "transition-all duration-300 ease-out",
        className
      )}
      {...props}
    >
      <VisuallyHidden>
        <DialogPrimitive.Title>Dialog</DialogPrimitive.Title>
        <DialogPrimitive.Description>Dialog</DialogPrimitive.Description>
      </VisuallyHidden>

      {children}

      {/* Tombol Close */}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full bg-red-600 text-white w-30 h-9 shadow hover:bg-red-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-300"
        aria-label="Close"
      >
        <Cross2Icon className="h-4 w-4" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

/* -------------------- Header / Footer -------------------- */
const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
