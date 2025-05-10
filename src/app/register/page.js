"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Define Zod schema
const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(3, "Address is required"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: data.address,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to register user");

      alert("Registration successful");
      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1224] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#1f2a48] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-400">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-300">First Name</label>
            <input
              {...register("firstName")}
              className="w-full px-4 py-2 bg-[#0d1224] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.firstName && (
              <p className="text-red-400 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Last Name</label>
            <input
              {...register("lastName")}
              className="w-full px-4 py-2 bg-[#0d1224] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.lastName && (
              <p className="text-red-400 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 bg-[#0d1224] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Phone Number</label>
            <input
              type="tel"
              {...register("phone")}
              className="w-full px-4 py-2 bg-[#0d1224] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Address</label>
            <input
              {...register("address")}
              className="w-full px-4 py-2 bg-[#0d1224] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.address && (
              <p className="text-red-400 text-sm">{errors.address.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-2">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-purple-300 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
