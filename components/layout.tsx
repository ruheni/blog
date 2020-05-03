import Footer from "./footer";


export default function Layout({ children, title }) {
    return (
        <>
            <main className="container">{children}</main>
            <Footer />
        </>
    )
}
