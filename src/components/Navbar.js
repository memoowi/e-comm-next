"use client";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    console.log(open);
    setOpen(!open);
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 sticky top-0 z-30 bg-white shadow">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="w-8"
        />
        <span className="font-teko text-3xl font-bold">{Config.appName()}</span>
      </Link>
      <nav className="text-3xl flex items-center gap-4">
        <Link href="/search">
          <CiSearch />
        </Link>
        <Link href="/cart">
          <CiShoppingCart />
        </Link>
        <button type="button" onClick={toggleMenu}>
          <CiUser />
        </button>
      </nav>

      <div className={"absolute flex flex-col gap-2 bg-white shadow-lg top-20 right-4 py-4 min-w-40 rounded-md transition-all duration-300 ease-in-out origin-top-right " + (open ? "scale-100 opacity-100" : "scale-0 opacity-0")}>
        <Link href="/login" className="py-2 px-4 hover:bg-gray-100 text-start">
          Login
        </Link>
        <Link
          href="/register"
          className="py-2 px-4 hover:bg-gray-100 text-start"
        >
          Register
        </Link>
        <Link
          href="/profile"
          className="py-2 px-4 hover:bg-gray-100 text-start"
        >
          Profile
        </Link>
        <Link href="/order" className="py-2 px-4 hover:bg-gray-100 text-start">
          My Order
        </Link>
        <button
          type="button"
          onClick={logout}
          className="py-2 px-4 hover:bg-gray-100 text-start"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
