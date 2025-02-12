"use client";
import CustomInput from "@/components/CustomInput";
import FilledButton from "@/components/FilledButton";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { CiCircleAlert } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [obscurePassword, setObscurePassword] = useState(true);
  const [obsConfirmPass, setObsConfirmPass] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleObscurePassword = () => {
    setObscurePassword(!obscurePassword);
  };
  const toggleObsConfirmPass = () => {
    setObsConfirmPass(!obsConfirmPass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // console.log(formData);
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Password and confirm password doesn't match");
      }
      
      const res = await fetch(Config.baseApiUrl() + "register", {
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      localStorage.setItem("token", result.data.token);
      router.push("/");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4"
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
      <h1 className="text-2xl font-bold">Register</h1>
      {error && (
        <div className="flex items-center gap-2 text-red-500 bg-red-500/20 py-2 px-4 rounded text-sm border border-red-500 w-2/3 mb-2">
          <CiCircleAlert className="shrink-0 text-lg" />
          {error}
        </div>
      )}
      <CustomInput
        id="name"
        name="name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        value={formData.name}
        placeholder="Enter your Name"
        required={true}
        className={"w-2/3"}
      />
      <CustomInput
        type="email"
        id="email"
        name="email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        value={formData.email}
        placeholder="Enter your Email"
        required={true}
        className={"w-2/3"}
      />
      <div className="w-2/3 relative">
        <CustomInput
          type={obscurePassword ? "password" : "text"}
          id="password"
          name="password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          value={formData.password}
          placeholder="Enter your Password"
          required={true}
          className={"w-full"}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2"
          onClick={toggleObscurePassword}
        >
          {obscurePassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <div className="w-2/3 relative">
        <CustomInput
          type={obsConfirmPass ? "password" : "text"}
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          required={true}
          className={"w-full"}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2"
          onClick={toggleObsConfirmPass}
        >
          {obsConfirmPass ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <FilledButton
        type="submit"
        className={"w-2/3 disabled:bg-opacity-70"}
        disabled={loading}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-xl" />
        ) : (
          <BiLogInCircle className="text-2xl" />
        )}
        Register
      </FilledButton>
      <p className="text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
