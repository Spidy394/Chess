const Button = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 sm:px-8 py-2 sm:py-4 text-lg sm:text-2xl bg-green-500 hover:bg-green-700 text-white font-bold rounded"
    >
     {children}
    </button>
  );
};

export default Button;
