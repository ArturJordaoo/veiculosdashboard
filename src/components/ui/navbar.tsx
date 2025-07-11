import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName }) => {
  const getFirstName = (name: string) => name.split(' ')[0];

  return (
    <div className="w-full bg-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-[#2B3A4B]">
        <Link href="/dashboard">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={157}
            height={44}
            className="w-auto max-w-full h-auto" // Responsividade da imagem
          />
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src="/images/userlogo.svg"
            alt="user"
            width={26}
            height={26}
            className="relative grid justify-center items-center mx-2 cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>{getFirstName(userName)}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer"
          >
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
