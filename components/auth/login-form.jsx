"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { SiteLogo } from "@/components/svg";
import { Logo } from "@/components/svg";
import { Logo1 } from "@/components/svg";
import { Logo2 } from "@/components/svg";
import { Logo3 } from "@/components/svg";
import { Logo4 } from "@/components/svg";


import { Icon } from "@iconify/react";
import { Checkbox } from "@/components/ui/checkbox";

import googleIcon from "@/public/images/auth/google.png";
import facebook from "@/public/images/auth/facebook.png";
import twitter from "@/public/images/auth/twitter.png";
import GithubIcon from "@/public/images/auth/github.png";

import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

const schema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});
import { useMediaQuery } from "@/hooks/use-media-query";

const LogInForm = () => {

  const [isPending, startTransition] = React.useTransition();       // For "Sign In" button
  const [isRegistering, setIsRegistering] = React.useState(false);    // For "Register Account" button
  
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "info@libertalia.co.za",
      password: "password",
    },
  });

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  
  const onSubmit = (data) => {
    startTransition(async () => {

      console.log("data ::: " + JSON.stringify(data));  

  
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log("SIGNING IN USER WITH EMAIL ::: " + data.email);
          
        toast.success("Login Successful");
        window.location.assign("/tour");
        //const user = userCredential.user;
        //console.log("HANDLE LOGIN ::: SIGNING IN USER ::: " + JSON.stringify(user.email));
        //console.log("User logged in : ", userCredential.user);
      })

        

    })
  };

  /**
   *  const onSubmit = (data) => {
    startTransition(async () => {
      let response = await signInWithEmailAndPassword("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Login Successful");
        window.location.assign("/dashboard");
        reset();
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  };

   *     let response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        //toast.success("Login Successful");
        console.log("Login Succesful, instead of toast");

      } else if (response?.error) {
        console.log("ERROR: " + response?.error);
        toast.error(response?.error);
      }

   */

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);  
      setIsRegistering(true);
      startTransition(async () => {

      // Create user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password).then(() => {
        console.log("SIGNING IN USER WITH EMAIL ::: " + email);  
        const user = userCredential.user;
        console.log("HANDLE LOGIN ::: SIGNING IN USER ::: " + JSON.stringify(user.email));
        toast.success("Login Successful");
        window.location.assign("/dashboard");
        reset();
      });
      
    });
      // Redirect to the admin dashboard tour
      //router.push("/dashboard");
    
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  

  };

  const handleClick = async () => {
    setIsRegistering(true);

    try {
      // Simulating registration process (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 12000)); // Simulate async operation

      // The user will be redirected to the register page once registration completes.
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="w-full py-1">
      <Link href="/dashboard" className="flex justify-center">
        <div className="flex justify-center">
          <Logo3 className="h-24 w-24 2xl:w-32 2xl:h-40 lg:w-40 lg:h-40" />
        </div>
      </Link>
      <div className="2xl:mt-4 mt-2 2xl:text-3xl text-2xl font-bold text-zinc-800 flex justify-center">
        Welcome To Libertalia! 👋
      </div>
      <div className="2xl:text-lg text-base text-default-600 2xl:mt-2 leading-6 flex justify-center">
        Please Enter Your Login Information To Access Platform.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7">
        <div>
          <Label htmlFor="email" className="mb-2 font-medium text-default-600">
            Email{" "}
          </Label>
          <Input
            disabled={isPending}
            {...register("email")}
            type="email"
            id="email"
            className={cn("", {
              "border-destructive": errors.email,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
        </div>
        {errors.email && (
          <div className=" text-destructive mt-2">{errors.email.message}</div>
        )}

        <div className="mt-3.5">
          <Label
            htmlFor="password"
            className="mb-2 font-medium text-default-600"
          >
            Password{" "}
          </Label>
          <div className="relative">
            <Input
              disabled={isPending}
              {...register("password")}
              type={passwordType}
              id="password"
              className="peer "
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=" "
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
        </div>
        {errors.password && (
          <div className=" text-destructive mt-2">
            {errors.password.message}
          </div>
        )}

        <div className="mt-5  mb-8 flex flex-wrap gap-2">
          <div className="flex-1 flex  items-center gap-1.5 ">
            <Checkbox
              size="sm"
              className="border-default-800 mt-[1px]"
              id="isRemebered"
            />
            <Label
              htmlFor="isRemebered"
              className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
            >
              Remember me
            </Label>
          </div>
          <Link href="/auth/forgot" className="flex-none text-sm text-default-600">
            Forget Password?
          </Link>
        </div>
        <Button
          className="w-full bg-amber-500 hover:bg-amber-900 text-white"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
          color="dark"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Sign In"}
        </Button>

          <div className="mt-6 xl:mt-8 flex flex-wrap justify-center gap-4">
          <Badge color="secondary">
              <Star className=" ltr:mr-1 rtl:ml-1 h-3 w-3" />
                  Don't have an account yet? 
                  
                  <Link href="/auth/register" className="text-amber-800 underline text-base m-1">
                    <Button
                      className="bg-slate-400 hover:bg-amber-900 text-white"
                      onClick={handleClick} // Trigger loading indicator when the button is clicked
                      disabled={isRegistering} // Disable the button while loading
                    >
                      {isRegistering && <Loader2 className="mr-2 h-10 w-10 animate-spin" />}
                      {isRegistering ? "Loading..." : "Register Account"}
                    </Button>
                  </Link>
            </Badge>
            
          </div>
      </form>
      
      
    </div>
  );
};

export default LogInForm;


/**
 * 
 * {" "}
                  Register Account{" "}
                  
 * 
 */