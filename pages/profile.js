import { getSession } from "next-auth/react";

import UserProfile from "@/components/profile/userProfile";

export async function getServerSideProps(ctx){
  const session = await getSession(ctx);

  if(!session){
    return{
      redirect: {
        destination: "/auth",
        permanent: false // Redirects only once since the user is not logged in
      }
    }
  }
  return{
    props: { session }
  }
}

function ProfilePage({ session }){
  return <UserProfile session={session}/>;
}

export default ProfilePage;