import { hashPassword } from "@/helpers/auth-helper";
import { databaseConnection } from "@/helpers/db-helper";

async function register(req, res){
  if(req.method !== "POST"){
    return;
  }
  
  const data = req.body;
  const { email, password } = data;

  if(!email || !email.includes("@")
  || !password || password.trim().length < 7){
    res.status(422).json({ message: "Invalid Input - Password must have at least 7 characters" });
    return;
  }
  const client = await databaseConnection();
  const db = client.db();

  const userFinder = await db.collection("users").findOne({ email: email }) // Checks if a user exists
  if(userFinder){
    res.status(422).json({
      message: "User already exists"
    });
    client.close();
    return;
  }
  
  const hashedPassword = await hashPassword(password);
    
  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword
  });

   res.status(201).json({
     message: "User created"
   });
   client.close();
}

export default register;