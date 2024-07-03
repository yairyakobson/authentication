import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";
import { databaseConnection } from "@/helpers/db-helper";
import { hashPassword, verifyPassword } from "@/helpers/auth-helper";

async function passwordHandler(req, res){
  if(req.method !== "PATCH"){
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if(!session){
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;

  const client = await databaseConnection();
  const collection = client.db().collection("users");
  const user = await collection.findOne({ email: userEmail });

  if(!user){
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordCheck = await verifyPassword(oldPassword, currentPassword);

  if(!passwordCheck){ // Checks if you're authorized for the operation
    client.close();
    return res.status(403).json({ message: "You don't have a permission" });
  }
  const hashedNewPassword = await hashPassword(newPassword);
  const result = await collection.updateOne(
    { email: userEmail },
    { $set: { password: hashedNewPassword } }
  );
  client.close();

  res.status(200).json({ message: "Password successfully updated" });
}

export default passwordHandler;