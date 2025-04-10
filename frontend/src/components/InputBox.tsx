import { ChangeEvent, memo } from "react";
interface InputBoxProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InputBox = ({
  label,
  placeholder,
  name,
  value,
  type = "text",
  onChange,
}: InputBoxProps) => {
  // console.log(name);
  return (
    <div>
      <div className="md:text-xl font-medium text-left py-2">{label}</div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
};

export default memo(InputBox, (prevProps, nextProps) => {
  const isSame =
    prevProps.value === nextProps.value &&
    prevProps.name === nextProps.name &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.label === nextProps.label &&
    prevProps.onChange === nextProps.onChange;

  // if (!isSame) {
  //   console.log(`🔁 Re-rendering InputBox: ${nextProps.name}`);
  //   console.log("Previous Props:", prevProps);
  //   console.log("Next Props:", nextProps);
  // } else {
  //   console.log(`✅ Skipped re-render for InputBox: ${nextProps.name}`);
  // }

  return isSame;
});
