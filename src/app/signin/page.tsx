"use client";
import signIn from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Page(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn(email, password);

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    // Sign in successful
    console.log(result);

    // Redirect to the admin page
    // Typically you would want to redirect them to a protected page an add a check to see if they are admin or
    // create a new page for admin
    router.push("/produk");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex min-h-screen flex-col items-center p-24 bg-white">
      <div className="flex m-[55px]">
        <div className="m-[10px]">
          <img src="/Logo1.svg" alt="My Image" />
        </div>
        <div className="m-[10px] flex flex-col ">
          <p className="text-[#0D6D8C] text-[27px] font-jakarta font-semibold tracking-[5.6px]">TuBi</p>
          <p className="text-[#0D6D8C] text-[30px] font-jakarta font-semibold whitespace-nowrap overflow-hidden">Manajer Toko</p>
        </div>
      </div>
      <form onSubmit={handleForm} className="flex flex-col">
        <p className="font-poppins text-[#55A3BD] text-[18px] font-medium">Email</p>
        <input onChange={(e) => setEmail(e.target.value)} required type="text" id="email" className="font-poppins text-[#0D6D8C] w-[349px] h-[45px] bg-#E4F2F6 font-[500] border-2 border-[#E4F2F6] rounded-xl px-[5px]" placeholder="Email" />
        <p className="font-poppins text-[#55A3BD] text-[18px] font-medium">Password</p>
        <div className="relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            className="font-poppins text-[#0D6D8C] w-[349px] h-[45px] bg-#E4F2F6 font-[500] border-2 border-[#E4F2F6] active:border-[#40B6DD]  rounded-xl px-[5px]"
            placeholder="Password"
          />
          <img src={showPassword ? "/loginPage/eyeClose.svg" : "/loginPage/eyeOpen.svg"} alt="Toggle Password Visibility" className="absolute right-4 top-3 cursor-pointer w-[21px]" onClick={togglePasswordVisibility} />
        </div>
        <button className="w-[197px] h-[48px] bg-[#25B6D0] m-4 place-self-center rounded-md font-poppins text-[16px]">Sign in</button>
      </form>
    </div>

    // <div className="flex flex-col items-center justify-center h-screen">
    //   <div className="w-full max-w-xs">
    //     <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    //       <h1 className="text-3xl font-bold mb-6 text-black">Sign In</h1>
    //       <div className="mb-4">
    //         <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
    //           Email
    //         </label>
    //         <input
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //           type="email"
    //           name="email"
    //           id="email"
    //           placeholder="example@mail.com"
    //           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //         />
    //       </div>
    //       <div className="mb-6">
    //         <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
    //           Password
    //         </label>
    //         <input
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //           type="password"
    //           name="password"
    //           id="password"
    //           placeholder="password"
    //           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //         />
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <button className="w-[197px] h-[48px] bg-[#25B6D0] m-4 place-self-center rounded-md font-poppins text-[16px]">Sign in</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}

export default Page;
