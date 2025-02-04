"use client";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import background from "@/assets/images/background.png";
import CustomButton from "../shared/CustomButton";
import { useRouter } from "next/navigation";
import { handleError } from "@/lib";
import { toast } from "sonner";
import { axiosInstance as axios } from "@/lib";

interface AccountInfo {
  name?: string;
  address?: string;
  email?: string;
  colors?: string[];
  type: "Personal" | "Business" | "Freelance";
  phone?: string;
  logo?: File | null;
}

const validateAccountInfo = (info: AccountInfo): boolean => {
  if (info.type === "Business") {
    if (
      !info.name ||
      !info.address ||
      !info.email ||
      !info.phone ||
      !info.colors ||
      !info.colors.some(color => color.trim().length > 0)
    ) {
      toast.error("All fields are required for Business accounts.");
      return false;
    }
  }
  return true;
};


const AddAcctInfo = () => {
  const [businessAccount, setBusinessAccount] = useState<AccountInfo>({
    name: '',
    address: '',
    email: '',
    colors: [''],
    type: 'Business',
    phone: '',
    logo: null
  });

  const [accoutnId, setAccountId] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, files } = e.target as HTMLInputElement;
    setBusinessAccount((prev) => ({
      ...prev,
      [id]: id === "colors" ? [value] : files ? files[0] : value,
    }));
  };

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setAccountId(parsedUser?.data?.account?.id)
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (validateAccountInfo(businessAccount)) {
        const res = await axios.put(`/accounts/${accoutnId}`, businessAccount);

        // Update user account info in localStorage
        const user = localStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          parsedUser.account = { ...parsedUser.account, ...businessAccount };
          localStorage.setItem("user", JSON.stringify(parsedUser));
        }

        toast.success(res.data.message);
        router.push("/account-success");
      }
    } catch (error) {
      toast.error(handleError(error));
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white font-clash flex-col md:flex-row overflow-hidden">
      <div className="hidden md:block w-1/2 bg-cover bg-no-repeat bg-center">
        <Image src={background} alt="background" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="flex flex-col items-center mb-2">
            <Image src={Logo} alt="Logo" className="mb-4" />
            <p className="text-2xl font-clashSemiBold text-center">Add Account Info </p>
            <p className="text-cdneutral-darkGray text-sm text-center mb-6">
              Enter the info needed to complete registration{" "}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-cdneutral-black" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                placeholder="e.g. Frank"
                value={businessAccount.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-cdneutral-black" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                placeholder="e.g. address"
                value={businessAccount.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-cdneutral-black" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                placeholder="e.g email@bussiness.com"
                value={businessAccount.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-cdneutral-black" htmlFor="colors">
                Colors
              </label>
              <div className="flex justify-between items-center">
                <select
                  id="colors"
                  className="w-full border text-cdneutral-darkGray rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                  value={businessAccount.colors && businessAccount.colors[0]}
                  onChange={handleChange}
                >
                  <option value="">Select Color</option>
                  <option value="grey">Grey</option>
                  <option value="purple">Purple</option>
                </select>
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-cdneutral-black" htmlFor="type">
                Bussiness Type
              </label>
              <div className="flex justify-between items-center">
                <select
                  id="type"
                  className="w-full border text-cdneutral-darkGray rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                  value={businessAccount.type}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="Business">Business</option>
                  <option value="Personal">Personal</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-cdneutral-black" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                placeholder="e.g. 0858694.."
                value={businessAccount.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-cdneutral-black" htmlFor="logo">
                Upload Business Logo
              </label>
              <input
                id="logo"
                type="file"
                accept=".png, .jpeg, .webp"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-cdneutral-darkGray focus:outline-none"
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-center">
              <CustomButton
                className={
                  "bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 w-full md:w-[260px] font-clashSemiBold py-4 flex items-center justify-center space-x-3"
                }
                type="submit"
                loading={loading}
                disabled={loading}
              >
                <p className="font-bold md:text-[16px] text-[16px]">Proceed</p>
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAcctInfo;