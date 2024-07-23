function Avatar({ character = "P", className=""}: { character: string, className?: string }) {
  return (
    <div className={`flex flex-col justify-center items-center bg-purple-500 rounded-full w-6 h-6 ${className}`}>
      <p className="text-white">{character}</p>
    </div>
  );
}

export default Avatar;
