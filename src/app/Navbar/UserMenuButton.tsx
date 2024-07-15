"use client";

import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        {user ? (
          <Image
            src={user?.image || profilePicPlaceholder}
            alt={user?.name || "Profile picture"}
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        )}
      </label>

      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-30 mt-3 w-52 gap-2 rounded-box bg-base-100 p-4 shadow"
      >
        {user && (
          <li>
            <Link className="link-primary" href={"/add-product"}>
              Add Product
            </Link>
          </li>
        )}
        <li>
          {user ? (
            <button
              className="text-error"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          ) : (
            <button className="text-primary" onClick={() => signIn()}>
              Sign In
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
