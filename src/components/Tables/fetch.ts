import { StaticImageData } from "next/image";
import { logos } from "../../assets/logos";

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Free package",
      price: 0.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Business Package",
      price: 99.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Unpaid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Pending",
    },
  ];
}

type SocialChannel = {
  name: string;
  followers: number;
  following?: number;
  messages: number;
  logo: StaticImageData; // 👈 очень важно!
};

export async function getTopSocialChannels(): Promise<SocialChannel[]> {
  return [
    {
      name: "Discord",
      followers: 12500,
      following: 58,
      messages: 1220,
      logo: logos.discord, // ✅ это StaticImageData
    },
    {
      name: "Telegram",
      followers: 20400,
      following: 0,
      messages: 870,
      logo: logos.telegram,
    },
    {
      name: "Instagram",
      followers: 15300,
      following: 789,
      messages: 1030,
      logo: logos.instagram,
    },
  ];
}
