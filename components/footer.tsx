import React from 'react'

const Footer: React.FC = () => {
    const date = new Date().getFullYear()

    return (
        <footer className="footer">
            <p>
                🏗  by Ruheni Alex
                    <br />
                    &copy; {date}
            </p>
        </footer>
    )
}

export default Footer;
