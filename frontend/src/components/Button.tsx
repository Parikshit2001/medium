interface buttonType {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: buttonType) {
  return <button onClick={onClick} className="text-white bg-black rounded-lg py-2">{label}</button>;
}

export default Button;
