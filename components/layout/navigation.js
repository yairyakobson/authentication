import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { signOut, useSession } from "next-auth/react";

function Navigation(){
  const { data: session, status } = useSession();
  const router = useRouter()
  console.log(session);
  console.log(status);

  async function logoutHandler(){
    const data = await signOut({ redirect: false, callbackUrl: "/auth" })
    router.push(data.url);

    toast.success("Successfully Logged Out", {
      autoClose: 1000
    })
  }

  return(
    <header className="w-full h-20 bg-[#38015c] shadow-[0_1px_4px_rgba(0,0,0,0.2)]
    flex justify-between items-center py-0 px-[10%]">
      <Link href="/">
        <div className="font-sans font-[2rem] text-white m-0">Next Auth</div>
      </Link>
      <nav>
        <ul className="list-none m-0 p-0 flex items-baseline	">
          {!session && status && (
            <li className="my-0 mx-4">
              <Link href="/auth" className="no-underline text-white
              font-bold hover:text-[#c291e2]">Login</Link>
            </li>
          )};
          {session && (
            <li className="my-0 mx-4">
              <Link href="/profile" className="no-underline text-white
              font-bold hover:text-[#c291e2]">Profile</Link>
            </li>
          )};
          {session && (
            <li className="my-0 mx-4">
              <button onClick={logoutHandler} className="font-[inherit] bg-transparent border border-solid border-white
              text-white font-bold py-2 px-6 rounded-md cursor-pointer
              hover:bg-[#c291e2] hover:text-[#38015c]">Logout</button>
            </li>
          )};
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;