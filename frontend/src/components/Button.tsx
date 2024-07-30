interface buttonInterface {
  label: string;
  isSubmittingLabel: string;
  type: "submit" | "button" | "reset";
  isSubmitting: boolean;
}

function Button({
  label,
  isSubmittingLabel,
  type,
  isSubmitting,
}: buttonInterface) {
  return (
    <button
      type={type}
      className="text-white bg-black rounded-lg py-2"
      disabled={isSubmitting}
    >
      {isSubmitting ? isSubmittingLabel : label}
    </button>
  );
}

export default Button;
