"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import { Loader } from "lucide-react";

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

import { auth,db } from "@/firebase/config";
import { getFirestore, collection, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

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

  useEffect(()=> {
   
    /**
    const usersRef = collection(db, "users");
    const q = query(usersRef);
    
    getDocs(q)
        .then((querySnapshot) => {
          console.log("USERS COLLECTION  :::: " + JSON.stringify(querySnapshot));
       
        })
        .catch((error) => {
            console.error("Error querying or setting document:", error);
        });
    */
  });


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
      setIsLoading(true);
      console.log("REG FORM ::: ONSUBMIT ::: DATA ::: " + JSON.stringify(data));

      let objUser = { ...data};
      console.log("REG FORM ::: ONSUBMIT ::: DATA ::: " + JSON.stringify(objUser));
      


      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userObj) => {
        
        console.log("CREATE USER WITH EMAIL AND PASSWORD RESPONSE ::: " + JSON.stringify(userObj.user.uid));
        objUser.uid = userObj.user.uid;
        console.log("REG FORM ::: objUser ::: " + JSON.stringify(objUser));

        //console.log("CREATE USER WITH EMAIL AND PASSWORD RESPONSE ::: " + JSON.stringify(userObj));
        let response = await addUser(objUser);
        console.log("response ::: " + JSON.stringify(response));

        if (response?.status === "success") {
        console.log("HANDLE REGISTER ::: CREATED USER successfully");
        toast.success("Registration Successful");

        // toast.success(response?.message);
        
        router.push("/");
        reset();
        } else {
          toast.error(response?.message);
        }
        //const user = userCredential.user;
        //console.log("HANDLE REGISTER ::: CREATED USER ::: " + JSON.stringify(user));
        //router.push("/");
        //window.location.assign("/");
        //reset();

        /**
        // Save user details to Firestore
        await setDoc(doc(db, "users", userObj.user.uid), {
          fullName: data.name,
          email: data.email,
          role: "agent", // Default role
          createdAt: new Date().toISOString(),
        }).then(async (result) => {
          console.log("SET DOCUMENT RESULT ::: " + JSON.stringify(result));

          /**
           // Send email verification
            await sendEmailVerification(userObj.user).then(() => {
              console.log("Verification email sent to", userObj.user.email);
              reset();
              router.push("/login");
            }).catch((error) => {
              console.error("Error sending verification email:", error);
            });
        });
        */
       
        
      }).catch((error) => {
        console.error("Error creating user:", error);
        toast.error(error.message);
      });

/**
        
 */
        // Redirect to the admin dashboard tour
        //toast.success(JSON.stringify(response));
        
      })

      /**

      let firebaseResponse = await createUserWithEmailAndPassword("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then(() => {
        console.log("SIGNING IN USER WITH EMAIL ::: " + email);
        const user = userCredential.user;
        console.log("HANDLE LOGIN ::: SIGNING IN USER ::: " + JSON.stringify(user.email));
         toast.success("Login Successful");
      })     */
    

  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const { fullName, phoneNumber, email, password, confirmPassword } = formData;

    console.log("FORM DATA  :::: " + JSON.stringify(formData));

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    //const auth = getAuth();
    //const db = getFirestore();

    startTransition(async () => {

      try {
        setIsLoading(true);
  
  
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          console.log("CREATE USER WITH EMAIL AND PASSWORD RESPONSE ::: " + JSON.stringify(response));
          // Redirect to the admin dashboard tour
          toast.success(JSON.stringify(response));
          
        }).finally(async () => {
          
          const user = userCredential.user;
          console.log("HANDLE REGISTER ::: CREATED USER ::: " + JSON.stringify(user));
    
          // Send email verification
          await sendEmailVerification(user).then(() => {
            console.log("Verification email sent to", user.email);
          }).catch((error) => {
            console.error("Error sending verification email:", error);
          });;
    
          // Save user details to Firestore
          await setDoc(doc(db, "users", user.uid), {
            fullName,
            phoneNumber,
            email,
            role: "agent", // Default role
            createdAt: new Date().toISOString(),
          }).then((result) => {
            console.log("SET DOCUMENT RESULT ::: " + JSON.stringify(result));
            reset();
            router.push("/");
          });
            
        });;

      
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    
    });

  };

  return (
    <div className="w-full">
      <Link href="/" className="flex justify-center">
        <Logo4 className="h-28 w-28 2xl:w-28 2xl:h-28 text-primary" />
      </Link>
      <div className="2xl:mt-3 mt-3 2xl:text-3xl text-2xl font-bold text-default-200 flex justify-center underline">
        Registration
      </div>
      <div className="2xl:text-lg text-base text-default-300 mt-2 leading-6 flex justify-center">
        Register your account with Libertalia!
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2 font-medium text-default-600">
              Full Name{" "}
            </Label>
            <Input
              disabled={isPending}
              {...register("name")}
              type="text"
              id="name"
              className={cn("", {
                "border-destructive": errors.name,
              })}
              size={!isDesktop2xl ? "xl" : "lg"}
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
              className="mb-2 font-medium text-default-600"
            >
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
            {errors.email && (
              <div className=" text-destructive mt-2 mb-4">
                {errors.email.message}
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="password"
              className="mb-2 font-medium text-default-600"
            >
              Password{" "}
            </Label>
            <div className="relative">
              <Input
                type={passwordType}
                id="password"
                size={!isDesktop2xl ? "xl" : "lg"}
                disabled={isPending}
                {...register("password")}
                className={cn("", {
                  "border-destructive": errors.password,
                })}
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
            size="sm"
            className="border-default-300 mt-[1px]"
            id="terms"
          />
          <Label
            htmlFor="terms"
            className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
          >
            You accept our Terms & Conditions
          </Label>
        </div>
        <Button
          className="w-full"
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



/***
 * 
 * 
 * 
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2 font-medium text-default-300">
              Full Name{" "}
            </Label>
            <Input
            
              {...register("name")}
              type="text"
              id="name"
              value={formData.fullName}
              required
            />
            {errors.name && (
              <div className=" text-destructive mt-2 mb-4">
                {errors.name.message}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="mb-2 font-medium text-default-300">
              Phone Number{" "}
            </Label>
              <Input
                {...register("phoneNumber")}
                id="phoneNumber"
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
              {...register("email")}
              type="email"
              name="email"
              id="email"
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
                {...register("password")}
                type="password"
                name="password"
                id="password"
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
                id="confirmPassword"
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
        
        <Button
          className="w-full hover:bg-amber-700"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Registering..." : "Create an Account"}
        </Button>

        {error && <p style={{ color: "red" }} className="m-2">{error}</p>}
        {success && <p style={{ color: "green" }} className="m-2">Successfully registered account </p>}
      
      </form>
      
 * 
 */