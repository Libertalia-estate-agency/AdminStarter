"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { addUser } from "@/action/auth-action";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/components/ui/checkbox";
import googleIcon from "@/public/images/auth/google.png";
import facebook from "@/public/images/auth/facebook.png";
import apple from "@/public/images/auth/apple.png";
import twitter from "@/public/images/auth/twitter.png";

import { SiteLogo } from "@/components/svg";
import { Logo } from "@/components/svg";
import { Logo1 } from "@/components/svg";
import { Logo2 } from "@/components/svg";
import { Logo3 } from "@/components/svg";
import { Logo4 } from "@/components/svg";
import { Logo5 } from "@/components/svg";

import signUp from "@/firebase/auth/signup";



import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});
const RegForm = () => {
  
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data) => {
    
    startTransition(async () => {
      let response = await addUser(data);

      if (response?.status === "success") {
        toast.success(response?.message);
        reset();
        router.push("/");
      } else {
        toast.error(response?.message);
      }
    });

  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { fullName, phoneNumber, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const auth = getAuth();
    const db = getFirestore();

    try {
      setIsLoading(true);
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        phoneNumber,
        email,
        role: "agent", // Default role
        createdAt: new Date().toISOString(),
      });

      // Redirect to the admin dashboard tour
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full">
      <Link href="/dashboard" className="flex justify-center">
        <Logo4 className="h-28 w-28 2xl:w-28 2xl:h-28 text-primary" />
      </Link>
      <div className="2xl:mt-3 mt-3 2xl:text-3xl text-2xl font-bold text-default-200 flex justify-center underline">
        Registration
      </div>
      <div className="2xl:text-lg text-base text-default-300 mt-2 leading-6 flex justify-center">
        Register your account with Libertalia!
      </div>
      
      <form onSubmit={handleRegister} className="mt-5 xl:mt-7">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2 font-medium text-default-300">
              Full Name{" "}
            </Label>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            {errors.name && (
              <div className=" text-destructive mt-2 mb-4">
                {errors.name.message}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="phone" className="mb-2 font-medium text-default-300">
              Phone Number{" "}
            </Label>
              <Input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            {errors.name && (
              <div className=" text-destructive mt-2 mb-4">
                {errors.name.message}
              </div>
            )}
          </div>
          
          <div>
            <Label
              htmlFor="email"
              className="mb-2 font-medium text-default-300"
            >
              Email Address{" "}
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && (
              <div className=" text-destructive mt-2 mb-4">
                {errors.email.message}
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="password"
              className="mb-2 font-medium text-default-300"
            >
              Password{" "}
            </Label>
            <div className="relative">
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
                onClick={togglePasswordType}
              >
                {passwordType === "password" ? (
                  <Icon
                    icon="heroicons:eye"
                    className="w-5 h-5 text-default-400"
                  />
                ) : (
                  <Icon
                    icon="heroicons:eye-slash"
                    className="w-5 h-5 text-default-400"
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <div className=" text-destructive mt-2">
                {errors.password.message}
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="passwordConfirm"
              className="mb-2 font-medium text-default-300"
            >
              Confirm Password{" "}
            </Label>
            <div className="relative">
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
                onClick={togglePasswordType}
              >
                {passwordType === "password" ? (
                  <Icon
                    icon="heroicons:eye"
                    className="w-5 h-5 text-default-400"
                  />
                ) : (
                  <Icon
                    icon="heroicons:eye-slash"
                    className="w-5 h-5 text-default-400"
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <div className=" text-destructive mt-2">
                {errors.password.message}
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex items-center gap-1.5 mb-8">
          <Checkbox
            size="md"
            className="border-default-300 mt-[1px]"
            id="terms"
          />
          <Label
            htmlFor="terms"
            className="text-sm text-default-300 cursor-pointer whitespace-nowrap"
          >
            Confirm that you have read and agree to abide by our <span className="underline text-amber-300 hover:text-amber-800"> Terms & Conditions </span>
          </Label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button
          className="w-full hover:bg-amber-700"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Registering..." : "Create an Account"}
        </Button>
      </form>
      
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
        >
          <Image src={googleIcon} alt="google icon" className="w-6 h-6" />
        </Button>
        
      </div>

      <div className="mt-5 2xl:mt-8 text-center text-base text-default-300">
        Already Have An Account? {" "}
        <Link href="/auth/login" className="text-primary underline hover:text-amber-900">
          <Badge className="hover:bg-amber-500">
            Sign In
          </Badge>
        </Link>
      </div>
    </div>
  );
};

export default RegForm;



