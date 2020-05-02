

export default function Layout({ children, title }) {
    const date = new Date().getFullYear()
    return (
        <>
            <main className="container">{children}</main>
            <footer className="copyright">
                <p>
                    🏗  by Ruheni Alex
                    <br />
                    &copy; {date}
                </p>
            </footer>
            {/* <script src="/prism.js"></script> */}
        </>
    )
}
