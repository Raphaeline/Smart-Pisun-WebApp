"use client";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../../../components/Navbar";

function Page(): JSX.Element {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	// Handle form submission
	const handleForm = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		// Attempt to sign up with provided email and password
		const { result, error } = await signUp(email, password);

		if (error) {
			// Display and log any sign-up errors
			console.log(error);
			return;
		}

		// Sign up successful
		console.log(result);

		// Redirect to the admin page
		router.push("/dashboard");
	};

	return (
		<div className="flex justify-center items-center h-screen text-black bg-[#f4f9fb]">
			<Navbar isDashboardPage={false} isProdukPage={false} isAdminPage={true} />
			<div className="w-96 bg-white rounded shadow p-6">
				<h1 className="text-3xl font-bold mb-6 font-jakarta">Registration</h1>
				<form onSubmit={handleForm} className="space-y-4">
					<div>
						<label htmlFor="email" className="block mb-1 font-medium font-jakarta">
							Email
						</label>
						<input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" className="w-full border border-gray-300 rounded px-3 py-2 font-jakarta" />
					</div>
					<div>
						<label htmlFor="password" className="block mb-1 font-medium font-jakarta">
							Password
						</label>
						<input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" className="w-full border border-gray-300 rounded px-3 py-2 font-jakarta" />
					</div>
					<button type="submit" className="w-full bg-[#0D6D8C] text-white font-jakarta font-semibold py-2 rounded">
						Sign up
					</button>
				</form>
			</div>
		</div>
	);
}

export default Page;
