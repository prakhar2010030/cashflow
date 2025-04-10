// // Define the Heading component to accept children as a prop
// interface HeadingProps {
//   children: React.ReactNode; // This allows any valid React node to be passed as children
// }

// const Heading = ({ children }: HeadingProps) => {
//   return <div className="text-4xl font-medium">{children}</div>;
// };

// Define the Heading component to accept label as a prop
interface HeadingProps {
  label: String;
}

const Heading = ({ label }: HeadingProps) => {
  return <div className="text-2xl md:text-4xl font-medium">{label}</div>;
};

export default Heading;
