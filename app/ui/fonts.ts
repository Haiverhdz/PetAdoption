import { Poppins, Lusitana } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});
