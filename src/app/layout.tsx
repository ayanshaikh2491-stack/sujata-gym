import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "🏋️‍♀️ Sujata Gym - Transform Your Body, Transform Your Life",
  description: "Experience the future of fitness with immersive 3D gym environment, personalized training programs, and state-of-the-art equipment at Sujata Gym.",
  keywords: "gym, fitness, 3D gym, workout, training, health, exercise, bodybuilding",
  authors: [{ name: "Sujata Gym" }],
  openGraph: {
    title: "🏋️‍♀️ Sujata Gym - 3D Fitness Experience",
    description: "Transform your body with our immersive 3D gym environment and personalized training programs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
    >
      <body className="min-h-full">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
