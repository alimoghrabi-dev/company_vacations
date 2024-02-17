import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className="mt-20 px-2 sm:px-8 w-full">{children}</main>
    </div>
  );
}
