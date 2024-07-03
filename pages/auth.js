import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import AuthForm from "@/components/auth/authForm";

function AuthPage(){
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() =>{
    getSession().then((session) =>{
      if(session){
        router.replace("/"); // Redirect to homepage if authenticated
      }
      else{
        setLoading(false);
      }
    });
  });

  if(loading){
    return;
  }

  return <AuthForm/>;
}

export default AuthPage;