interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="cursor-pointer text-white md:text-xl w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg p-1 md:px-5 md:py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-300 dark:border-gray-300"
    >
      {label}
    </button>
  );
};

export default Button;
