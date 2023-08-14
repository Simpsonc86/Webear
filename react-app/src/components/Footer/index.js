import "../LandingPage/LandingPage.css"

export default function Footer() {
    return (
        <div className='footer'>
            <p className="disclaimer">Disclaimer: This is not a real financial website with real-time stock prices and purchases!</p>
            <div className="github-links">
                Contributor Links:
                <a className="group-link" href="https://github.com/Simpsonc86" target="_blank" rel="noopener noreferrer">
                    <img className="github-icon" src="/Github-icon.png" alt="github-icon" />
                    <p className="contributor-name">Christopher Simpson</p>
                </a>

                <a className="group-link" href="https://github.com/joshschenk" target="_blank" rel="noopener noreferrer">
                    <img className="github-icon" src="/Github-icon.png" alt="github-icon" />
                    <p className="contributor-name">Joshua Schenk</p>
                </a>
                <a className="group-link" href="https://github.com/MichaelLuuTrong" target="_blank" rel="noopener noreferrer">
                    <img className="github-icon" src="/Github-icon.png" alt="github-icon" />
                    <p className="contributor-name">Michael Luu-Trong</p>
                </a>
                <a className="group-link" href="https://github.com/ChrisBeaman11" target="_blank" rel="noopener noreferrer">
                    <img className="github-icon" src="/Github-icon.png" alt="github-icon" />
                    <p className="contributor-name">Christopher Beaman</p>
                </a>               
            </div>
        </div>
    )
}