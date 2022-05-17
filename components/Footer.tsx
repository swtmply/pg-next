import { AtSymbolIcon, PhoneIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { NavLink } from "./Header";
import { FacebookIcon, GithubIcon, LinkedInIcon, TwitterIcon } from "./icons";

interface FooterLinkProps {
  href: string;
}

const FooterLink: React.FC<PropsWithChildren<FooterLinkProps>> = ({
  children,
  href,
}) => {
  return (
    <Link href={href}>
      <a className="flex gap-6 items-center cursor-pointer">{children}</a>
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral-800 w-screen min-h-screen flex justify-center px-10 py-20 text-white overflow-hidden">
      <div className="w-10/12 max-w-7xl flex flex-col gap-16 relative">
        <h2 className="font-lora font-bold text-4xl">
          Connect with me through:
        </h2>
        <div className="grid auto-rows-auto lg:grid-cols-3 lg:grid-rows-2 gap-8">
          <FooterLink href="/">
            <TwitterIcon className="w-10 h-10" />
            <p>/allenwhun</p>
          </FooterLink>
          <FooterLink href="/">
            <GithubIcon className="w-10 h-10" />
            <p>/allenwhun</p>
          </FooterLink>
          <FooterLink href="/">
            <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
              <AtSymbolIcon className="text-neutral-800 w-6 h-6" />
            </div>
            <p>/allenwhun</p>
          </FooterLink>
          <FooterLink href="/">
            <FacebookIcon className="w-10 h-10" />
            <p>/allenwhun</p>
          </FooterLink>
          <FooterLink href="/">
            <LinkedInIcon className="w-10 h-10" />
            <p>/allenwhun</p>
          </FooterLink>
          <FooterLink href="/">
            <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
              <PhoneIcon className="text-neutral-800 w-6 h-6" />
            </div>
            <p>/allenwhun</p>
          </FooterLink>
        </div>
        <hr className="border-t-4 border-neutral-600 border-dashed w-64" />
        <nav className="relative">
          <div className="w-64 h-64 rounded-full absolute left-5 -top-10 bg-neutral-600/40 z-[9]" />
          <ul className="flex flex-col gap-8 z-10 relative">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/projects">Projects</NavLink>
          </ul>
        </nav>
        <div className="w-[30rem] aspect-square rounded-full absolute -bottom-64   right-10 border-4 border-neutral-600 border-dashed z-[9] flex items-center">
          <div className="relative">
            <div className="w-96 border-b-2 border-neutral-600 absolute -left-32" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
