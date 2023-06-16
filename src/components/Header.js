import { Image, useTheme } from "@aws-amplify/ui-react";
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'

export function Header() {
  const { tokens } = useTheme();

  return (
    <div className="flex flex-col items-center">
      <Link className='flex flex-row text-center hover:text-blue-700 text-whiterounded' href='/'> <BiArrowBack style={{marginTop: '4px', marginRight: '2px'}}/> Home</Link>
      <Image
        alt="logo"
        src="./6.svg"
        className="py"
      />
    </div>
  );
}
