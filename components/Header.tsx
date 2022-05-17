import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import Button from "./Button";
import { MoonIcon } from "@heroicons/react/outline";
import GithubIcon from "./icons/GithubIcon";
import { MenuIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";

interface NavLinkProps {
  href: string;
}

const links = {
  "/": "Home",
  "/blog": "Blog",
  "/projects": "Projects",
  "/#contact-me": "Contact Me",
};

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
          <h1 className="hidden md:block">allenwhun</h1>
        </div>

        <div className="flex gap-5">
          <ul className="hidden lg:flex gap-10 items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <Button>{links["/#contact-me"]}</Button>
          </ul>

          <NavMenu />

          <div className="w-[2px] bg-neutral-200 my-2" />
          <ul className="flex gap-10 items-center">
            <button>
              <MoonIcon className="w-6 h-6" />
            </button>
            <div className="hidden lg:block">
              <Link href="https://github.com/swtmply">
                <a>
                  <GithubIcon className="w-6 h-6 hover:text-pink-500" />
                </a>
              </Link>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

const NavMenu = () => {
  return (
    <Menu as="div" className="relative lg:hidden">
      <Menu.Button>
        <MenuIcon className="w-6 h-6" />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 flex flex-col gap-2 w-56 bg-white z-50 shadow-lg py-2 border border-black">
          {Object.keys(links).map((href) => {
            return (
              <Link key={href} href={href}>
                <Menu.Item
                  as="div"
                  className="p-4 py-2 w-full hover:bg-neutral-800 hover:text-white cursor-pointer"
                >
                  <a className="w-full">{(links as any)[href]}</a>
                </Menu.Item>
              </Link>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
