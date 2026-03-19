"use client";

import {useRouter} from "next/navigation";
export default function OrderPage() {
  const router = useRouter();
  const handleclick = () => {
    console.log("order placed");
    alert("order placed");
    router.push("/");
  };
  return (
    <>
      <button className="bg-red-400 text-white p-4 m-4" onClick={handleclick}>Place Order</button>
    </>
  );
}
