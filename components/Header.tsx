import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import Button from "./Button";
import { MoonIcon } from "@heroicons/react/outline";
import GithubIcon from "./icons/GithubIcon";

interface NavLinkProps {
  href: string;
}

export const NavLink: React.FC<PropsWithChildren<NavLinkProps>> = ({
  children,
  href,
}) => {
  return (
    <li className="hover:underline underline-offset-8 decoration-1">
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  );
};

const Header = () => {
  return (
    <header className="h-20 w-10/12 max-w-7xl border-b-2 border-b-gray-100 mb-4">
      <nav className="font-medium flex justify-between items-center px-2 py-4">
        <div className="flex items-center gap-1">
          <Image src="/assets/vectors/logo.svg" width={40} height={40} alt="" />
          <h1>allenwhun</h1>
        </div>

        <div className="flex gap-5">
          <ul className="flex gap-10 items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <Button>Contact Me</Button>
          </ul>
          <div className="w-[2px] bg-neutral-200 my-2" />
          <ul className="flex gap-10 items-center">
            <button>
              <MoonIcon className="w-6 h-6" />
            </button>
            <Link href="https://github.com/swtmply">
              <GithubIcon className="w-6 h-6 hover:text-pink-500" />
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
