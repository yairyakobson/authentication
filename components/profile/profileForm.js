import { useRef } from "react";
import { toast } from "react-toastify";

function ProfileForm({ onChangePassword }){
  const oldPass = useRef();
  const newPass = useRef();

  async function submitHandler(e){
    e.preventDefault();

    const oldPassValue = oldPass.current.value;
    const newPassValue = newPass.current.value;

    if(!oldPassValue || !newPassValue){
      toast.error("Both fields are required", {
        autoClose: 2000
      });
      return;
    }

    if(newPassValue.length < 8){
      toast.error('New password must be at least 8 characters long', {
        autoClose: 2000,
      });
      return;
    }

    toast.info("Loading...", {
      autoClose: 1000
    })

    try{
      await onChangePassword({
        oldPassword: oldPassValue,
        newPassword: newPassValue
      });

      toast.success("Password changed successfully", {
        autoClose: 1500
      });

      oldPass.current.value = "";
      newPass.current.value = "";
    }
    catch(error){
      toast.error(error.message, {
        autoClose: 1000
      });
    }
  }

  return(
    <form onSubmit={submitHandler}
    className="w-[95%] max-w-[25rem] my-8 mx-auto">

      <div className="mb-2">
        <label htmlFor="old-password"
        className="font-bold mb-2 text-[#353336] block">Old Password</label>
        <input type="password" id="old-password" ref={oldPass}
        className="block font-[inherit] w-full rounded
        border border-solid border-[#38015c] p-1 bg-[#f7f0fa]"/>
      </div>

      <div className="mb-2">
        <label htmlFor="new-password"
        className="font-bold mb-2 text-[#353336] block">New Password</label>
        <input type='password' id="new-password" ref={newPass}
        className="block font-[inherit] w-full rounded
        border border-solid border-[#38015c] p-1 bg-[#f7f0fa]"/>
      </div>

      <div className="mt-6">
        <button className="font-[inherit] cursor-pointer py-2 px-6 rounded
        border border-solid border-[#38015c] bg-[#38015c] text-white
        hover: bg=[#540d83] hover:border-[#540d83]">Change Password</button>
      </div>

    </form>
  );
}

export default ProfileForm;