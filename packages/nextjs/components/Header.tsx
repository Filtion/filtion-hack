"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import chatIcon from "./assets/chat_icon.svg";
import filtionLogo from "./assets/filtion_logo.svg";
import plusIcon from "./assets/plus_icon.svg";
import { useAccount } from "wagmi";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const { address: connectedAddress } = useAccount();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div
      className={`sticky lg:static top-0 navbar ${
        connectedAddress ? "bg-zinc-900 shadow-sm shadow-[#0391fd2f]" : "bg-black"
      } min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2 h-14`}
    >
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden text-white lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <Image src={filtionLogo} height={32} alt="filtion logo" />
        </Link>
      </div>
      <div className="navbar-end flex-grow mr-4 gap-5">
        {connectedAddress && (
          <div className="relative flex gap-5">
            <button className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
              <Image src={plusIcon} height={18} width={18} alt="plus icon" />
            </button>
            {menuOpen && (
              <div
                className="absolute text-white bg-zinc-900 w-44 rounded-lg p-4 shadow shadow-[#0391fd2f] top-7 right-10"
                onClick={() => setMenuOpen(false)}
              >
                <ul className="flex flex-col text-sm gap-3">
                  <Link href="/blog">Create blog post</Link>
                  <Link href="/note">View Private Notes</Link>

                  <Link href="/overview">All content overview</Link>
                </ul>
              </div>
            )}
            <Image src={chatIcon} height={18} width={18} alt="chat icon" />
          </div>
        )}
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
