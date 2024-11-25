
"use client"
import Image from "next/image";
import RegForm from "./reg-form";
import auth3Light from "@/public/images/auth/auth3-light.png"
import auth3Dark from "@/public/images/auth/auth3-dark.png"

import bg2 from "@/public/images/auth/gradient.png"

const RegisterPage = () => {
  return (

    

<>
    
    <div
        className="bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bg2.src})` }}
      >
    <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
  <div className="mx-auto h-full sm:w-max">
    <div className="m-auto py-2 px-2">
      
    <div className="mt-2 rounded-3xl border bg-gray-50 dark:border-gray-700 -mx-6 sm:-mx-10 p-8 sm:p-10">
          
      <RegForm />

    </div>
      <div className="border-t pt-12 text-gray-500 dark:border-gray-800">
        <div className="space-x-4 text-center">
          <span>Libertalia &copy; 2024</span>
          <a href="#" className="text-sm hover:text-sky-900 dark:hover:text-gray-300">Contact</a>
          <a href="#" className="text-sm hover:text-sky-900 dark:hover:text-gray-300">Privacy & Terms</a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>                                               
    </>




  );
};

export default RegisterPage;


/**
 * 
 *
<div className="loginwrapper  flex justify-center items-center relative overflow-hidden">
<Image
  src={auth3Dark}
  alt="background image"
  className="absolute top-0 left-0 w-full h-full light:hidden" />
<Image
  src={auth3Light}
  alt="background image"
  className="absolute top-0 left-0 w-full h-full dark:hidden" />
<div className="w-full bg-card   max-w-xl  rounded-xl relative z-10 2xl:p-16 xl:p-12 p-10 m-4 ">
  <RegForm />
</div>
</div> 
 * 
 * 
 */
