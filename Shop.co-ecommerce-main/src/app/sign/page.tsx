import Link from "next/link";
import Image from "next/image"; 

export default function Login() {
    return (
        <div className="flex justify-center items-center mt-5 ">
            <div className="rounded-2xl border-2 border-black flex justify-center items-center flex-col md:flex-row m-5">
            <div className="">
            <Image
            src="/login1.png"
            alt="Logo"
            width={900}
            height={900}
            className="object-cover w-[100%] h-[600px] rounded-l-2xl hidden md:block"
            />
            </div>
            <div className="p-10 py-1">
                <h1 className="text-[35px] text-center md:text-[60px] font-bold">Register Here</h1>
                <form className="mt-10">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    />
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-gray-500"
                        />
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-gray-500"
                        />
                    
                        <button
                            type="submit"
                            className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                        >Sign Up</button>
                    <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800 mt-4">
                        Already have an account? Login
                    </Link>
                    <hr />
                    <p className="text-center">or</p>
                    <div className="flex justify-center items-center pt-5 flex-col gap-4">
                    <button className="border-2 border-black py-2 px-5 flex justify-center items-center w-[250px] ">
                        <Image
                        src="/google.jpeg"
                        alt="google Logo"
                        width={200}
                        height={200}
                        className="w-[30px] h-[30px] pr-1"
                        />
                        Sign Up With Google</button>
                        <button className="border-2 border-black py-2 px-5 flex justify-center items-center w-[250px]">
                        <Image
                        src="/facebook.png"
                        alt="Facebook Logo"
                        width={70}
                        height={30}
                        className="w-[30px] h-[30px] pr-2"
                        />
                        Sign Up With Facebook</button>
                        </div>
                </form>
            </div>
            </div>
        </div>
    );
}
