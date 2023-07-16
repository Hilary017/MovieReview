import { Link } from "react-router-dom";

const Error = () => {
    return <div style={{display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems: "center",
                        height: "400px"
                        // textAlign: "center"
                        }}>
        <h2>404</h2>
        <p>Page Not Found!</p>
        <button style={{
                  backgroundColor: "rgba(2, 43, 133, 0.9)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "0.5rem 1rem",
                  height: "40px"
            }}>
            <Link href="/" style={{
                color: "white",
                textDecoration: "none"
            }}>
            Return to HomePage
            </Link>
        </button>
    </div>
}

export default Error;