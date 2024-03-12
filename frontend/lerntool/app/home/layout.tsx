import Navbar from "./components/Navbar/Navbar"
import Footer from "@/app/home/components/Footer/Footer";

export default function HomeLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Navbar />
        {children}
          <Footer />
      </section>
    )
  }