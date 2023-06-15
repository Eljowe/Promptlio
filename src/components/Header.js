import { Image, useTheme } from "@aws-amplify/ui-react";
import Link from 'next/link'
export function Header() {
  const { tokens } = useTheme();

  return (
    <div>
      <Link className='p-2 text-center hover:text-blue-700 text-whiterounded' href='/'>Home</Link>
      <Image
        alt="logo"
        src="./6.svg"
        className="py"
      />
    </div>
  );
}
