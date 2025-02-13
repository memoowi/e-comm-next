"use client";
import CustomInput from "@/components/CustomInput";
import FilledButton from "@/components/FilledButton";
import Config from "@/core/config";
import { useAuth } from "@/core/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import { CiCircleAlert } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function LoginForm() {
  const [obscurePassword, setObscurePassword] = useState(true);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toggleObscurePassword = () => {
    setObscurePassword(!obscurePassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(Config.baseApiUrl() + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const result = await res.json();
      // console.log(result);

      if (!res.ok) {
        throw new Error(result.message);
      }

      setFormData({
        email: "",
        password: "",
      });

      localStorage.setItem("token", result.data.token);
      router.push("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const user = useAuth();
  if (user) {
    window.location.href = "/";
    return;
  };

  return (
    <form
      className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="w-14"
        />
        <span className="font-teko text-4xl font-bold">{Config.appName()}</span>
      </Link>
      <div className="h-px w-1/2 bg-dark/20"></div>
      <h1 className="text-2xl font-bold">Login</h1>
      {error && (
        <div className="flex items-center gap-2 text-red-500 bg-red-500/20 py-2 px-4 rounded text-sm border border-red-500 w-2/3 mb-2">
          <CiCircleAlert className="shrink-0 text-lg" />
          {error}
        </div>
      )}
      <CustomInput
        type="email"
        id="email"
        name="email"
        placeholder="Enter your Email"
        required={true}
        className={"w-2/3"}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        value={formData.email}
      />
      <div className="w-2/3 relative">
        <CustomInput
          type={obscurePassword ? "password" : "text"}
          id="password"
          name="password"
          placeholder="Enter your Password"
          required={true}
          className={"w-full"}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2"
          onClick={toggleObscurePassword}
        >
          {obscurePassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <FilledButton type="submit" className={"w-2/3"} disabled={loading}>
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-xl" />
        ) : (
          <BiLogInCircle className="text-2xl" />
        )}
        Login
      </FilledButton>
      <p className="text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
