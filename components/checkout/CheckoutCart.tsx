"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

import { Minus } from "lucide-react";
import { toast } from "sonner";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useCartStore } from "../cart/cartHook";
import Counter from "../cart/counter";

export default function CheckoutCart() {
  const router = useRouter();
  const pathname = usePathname();

  const cart = useCartStore((s) => s.cart);
  const removeItem = useCartStore((s) => s.removeFromCart);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    lastName: "",
    number: "",
    address: "",
    otherInfo: "",
  });

  /* ---------------- FETCH USER ---------------- */
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          cache: "no-store",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }

    fetchUser();
  }, []);


  useEffect(() => {
    if (user?.name) {
      setInfo((prev) => ({
        ...prev,
        name: user.name,
      }));
    }
  }, [user]);


  if (!cart.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-center text-sm">Cart is empty</p>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };


  const handleClick = async () => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!info.name || !info.number || !info.address) {
      toast.error("Please fill required fields");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          name: `${info.name} ${info.lastName}`,
          phone: info.number,
          address: info.address,
          otherInfo: info.otherInfo,
        },
        items: cart,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Your order has been placed!");
      localStorage.removeItem("cart");
      router.push(`/order-success?orderId=${data.order._id}`);
    } else {
      toast.error(data.message || "Failed to place order");
    }

    setLoading(false);
  };


  return (
    <div className="h-max lg:h-screen p-7 w-full   flex lg:flex-row flex-col  gap-2  ">
      <div className="w-full lg:w-[60%]     lg:h-max ">
        <h1 className="font-bold text-3xl text-gray-800 tracking-tight">
          Checkout
        </h1>

        <p className="text-sm mt-2 text-gray-700 ">
          You have {cart.length} {cart.length > 1 ? "items" : "item"} in your
          cart
        </p>

        <div className="mt-8 flex flex-col gap-2 ">
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[7fr_1fr_1fr]  h-[7rem] w-full justify-between items-center  relative bg-white border rounded-2xl shadow-sm shadow-gray-200"
            >
              <div className="flex items-center  gap-3">
                <Button
                  onClick={() => removeItem(item.id)}
                  variant="secondary"
                  size="icon-sm"
                  disabled={loading}
                  className="text-red-500 bg-red-50 hover:bg-red-100 cursor-pointer hover:text-red-600 absolute top-5 right-5 rounded-full "
                >
                  <Minus className="w-1 h-1" />
                
                </Button>


                <Image
                  src={item.img}
                  alt={item.title}
                  height={200}
                  width={100}
              
                  className="p-1 rounded-md "
                  />
                
                <div className="flex flex-col items-start justify-start">
                  <h2 className=" line-clamp-1 font-semibold">{item.title}</h2>
                 
                  <Counter 
                   key={item.id}
    id={item.id}
    title={item.title}
    price={item.price}
    img={item.img}
                  />
                </div>
              </div>

              <div className="text-right  text-black text-xs md:text-sm">
                Rs.{(item.qty * item.price).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        
<div className="bg-white shadow-md shadow-gray-200 p-5 rounded-2xl mt-12 border ">

        <div className=" text-right w-full flex justify-between  ">
          <div className="flex flex-col gap-4 items-start justify-start">
            <span className="font-medium ">Subtotal: </span>
            <span className="font-medium ">Shipping Cost: </span>

            <span className="font-medium ">Total payable:</span>
          </div>
          <div className="flex flex-col gap-4 items-end justify-end  ">
            <span className="font-semibold">Rs.{total.toLocaleString()}</span>
            <span className="font-semibold">Rs.0</span>

            <span className="font-semibold ">Rs.{(total + 5).toLocaleString()}</span>
          </div>
        </div>
        <div className="w-full mt-6 text-center">
       
         {!user ? (
            <p className="text-sm text-red-400 text-center">
              Please login to checkout{" "}
              <Link
                href={`/login?redirect=${encodeURIComponent(pathname)}`}
                className="text-blue-500 underline"
              >
                Log in
              </Link>
            </p>
          ) : (
            <Button
              className="w-full"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner /> Processing
                </span>
              ) : (
                "Place Order"
              )}
            </Button>
          )}
</div>
        </div>
      </div>

      <div className=" h-max lg:h-max bg-white w-full lg:w-1/3 border rounded-2xl shadow-lg   shadow-gray-200">
        <form
          className="border p-7 rounded-2xl w-full lg:w-1/1 "
          onSubmit={handleClick}
        >
          <h1 className="font-bold  text-lg">Personal Information</h1>
          <p className="text-sm text-gray-600 py-3">Please enter your personal details and information</p>

          <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-4     ">
            <div className="flex-1  flex flex-col gap-4">
              <label htmlFor="name" className="font-semibold text-sm">
                First Name
              </label>
              <Input
                placeholder="First name"
                id="name"
                name="name"
                value={user?.name}
                required
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <label htmlFor="lastname" className="font-semibold text-sm">
                Last Name
                <span className="ml-1 text-gray-500">(optional)</span>
              </label>
              <Input
                placeholder="Last name"
                disabled={loading}

                id="lastname"
                name="lastName"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 w-1/1  ">
            <div className="flex-1  flex flex-col gap-4">
              <label htmlFor="number" className="font-semibold text-sm">
                Phone
              </label>

               <PhoneInput
                defaultCountry="PK"
                countries={["PK"]}
                value={info.number}
                onChange={(value) => setInfo({ ...info, number: value ?? "" })}
                className="w-full h-[2.5rem] border border-gray-300 rounded-md px-3 py-2 outline-0 placeholder:text-xs "
                placeholder="03123123123"
                 id="number" 
                 required
                disabled={loading}

              /> 

            

            </div>
          </div>
          <div className="mt-8 flex lg:flex-col  gap-4 w-full flex-col lg:items-center  ">
            <div className=" w-full flex flex-col gap-4">
              <label htmlFor="address" className="font-semibold text-sm">
                Address
              </label>
              <Input
                disabled={loading}

                placeholder="Your address"
                id="address"
                name="address"
                required
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <label htmlFor="otherInfo" className="font-semibold text-sm">
                Other info
                <span className="ml-1 text-gray-500">(optional)</span>
              </label>
              <Input
                disabled={loading}

                placeholder="e.g: Flat no 1"
                name="otherInfo"
                id="otherInfo"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className=" w-full flex items-end justify-end">
    
          </div>
        </form>
      </div>
    </div>  
  );
}
