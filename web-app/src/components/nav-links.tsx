"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Include links for the navigation bar
const links = [
  { name: "Commit", href: "/" },
  { name: "Runs", href: "/runs" },
  { name: "Withdraw", href: "/withdraw" },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <p key={link.name}> {/* Added key prop */}
            <Link
              href={link.href}
              className={clsx("text-gray-400", {
                "text-gray-800 text-bold": pathName === link.href,
              })}
            >
              {link.name}
            </Link>
          </p>
        );
      })}
    </>
  );
}
