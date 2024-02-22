import Navbar from "./components/Navbar/Navbar"

export default function HomeLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Navbar />
        {children}
      </section>
    )
  }