interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  desktop?: "xs" | "sm" | "md" | "lg";
}

export default function Dialog({
  open,
  onClose,
  children,
  desktop,
}: DialogProps) {
  const getDesktopDialogSize = () => {
    switch (desktop) {
      case "xs":
        return "lg:w-[20%]";
      case "sm":
        return "lg:w-[30%]";
      case "md":
        return "lg:w-[40%]";
      case "lg":
        return "lg:w-[60%]";
      default:
        return "lg:w-[50%]";
    }
  };

  return (
    <div
      className={`fixed z-[100] inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/30 backdrop-blur-[2px]" : "invisible"
      }`}
      onClick={onClose}
    >
      <section
        className={`flex justify-center items-center transition-all rounded-3xl overflow-hidden w-[75%] md:w-[50%]
          ${open ? "scale-125 opacity-100" : "scale-100 opacity-0"}
          ${getDesktopDialogSize()}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </section>
    </div>
  );
}
