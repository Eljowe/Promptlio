import { Image, useTheme } from "@aws-amplify/ui-react";
export function Header() {
  const { tokens } = useTheme();

  return (
    <div>
      <Image
        alt="logo"
        src="./6.svg"
        className="py"
      />
    </div>
  );
}