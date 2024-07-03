import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

async function register(email, password){
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

function AuthForm(){
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passRef = useRef();

  const router = useRouter();

  function switchAuthModeHandler(){
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(e){
    e.preventDefault()

    const emailInput = emailRef.current.value;
    const passwordInput = passRef.current.value;

    {passwordInput.length !== passRef.current.value && (
      toast.info("Loading...", {
        autoClose: 1000
      })
    )}

    if(isLogin){
      const result = await signIn("credentials",{
        redirect: false,
        email: emailInput,
        password: passwordInput
      });

      if(!result.error){
        toast.success("Welcome Back", {
          autoClose: 1500
        });
        router.replace("/profile");
      }
      else{
        toast.error(result.error, {
          autoClose: 1000
        });
      }
    }
    else{
      try{
        const result = await register(emailInput, passwordInput);

        if(result){
          emailRef.current.value = "";
          passRef.current.value = "";
          toast.success("Successfully Registered", {
            autoClose: 1000
          });
        }
      }
      catch(error){
        toast.error(error.message, {
          autoClose: 1000
        });
      }
    }
  }

  useEffect(() =>{
    emailRef.current.value = "";
    passRef.current.value = "";
  }, [isLogin]);

  return(
    <section className="my-12 mx-auto w-[95%] max-w-[25rem]
    rounded-md bg-[#38015c] shadow-[0_1px_4px_rgba(0,0,0,0.2)] p-4 text-center">
      <h1 className='text-center text-white'>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-2">
          <label htmlFor="email" className="block text-white font-bold mb-2">Your Email</label>
          <input type="email" id="email" ref={emailRef} required
          className="font-[inherit] bg-[#f1e1fc] text-[#38015c] rounded
          border border-solid border-white w-full text-left p-1"/>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-white font-bold mb-2">Your Password</label>
          <input type="password" id="password" ref={passRef} required
          className="font-[inherit] bg-[#f1e1fc] text-[#38015c] rounded
          border border-solid border-white w-full text-left p-1"/>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <button className="cursor-pointer font-[inherit] text-white bg-[#9f5ccc]
          border border-solid border-[#9f5ccc] rounded py-2 px-10
          hover:bg-[#873abb] hover:border-[#873abb]">{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className="mt-4 bg-transparent text-[#9f5ccc] rounded-none py-[0.15rem] px-6
            hover:bg-transparent hover:text-[#ae82cc]"
            onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;