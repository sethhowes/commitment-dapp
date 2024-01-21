import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <>
      <button
          {...rest}
          className={clsx(
            "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium",
            className,
            { "opacity-50 cursor-not-allowed": rest.disabled }
          )}
        >
        {children}
      </button>
    </>
  );
}
