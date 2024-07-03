import ProfileForm from "./profileForm";

function UserProfile(){

  async function passwordChanger(passwordData){
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if(!response.ok){
      throw new Error(data.message);
    }
  }

  return(
    <section className="my-12 mx-auto text-center">
      <h1 className="text-[5rem]">Your User Profile</h1>
      <ProfileForm onChangePassword={passwordChanger}/>
    </section>
  );
}

export default UserProfile;