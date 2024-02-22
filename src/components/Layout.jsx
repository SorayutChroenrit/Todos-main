import { Outlet } from "react-router"
import { Navbar } from "./Navbar"

const Header = () => {
    return (
        <div style={{height:'60px'  }}>
            <h1><span className="badge bg-dark">MANGO STORAGE</span></h1>
        </div>
        
        )
}

const Footer = () => {
    return (
        <div style={{height:'80px' }}>
            <h2>by <span className="badge bg-dark">Sorayut Chroenrit</span></h2>
        </div>
    )
}

export const Layout = ({setToken}) => {
    return (
        <div>
            <Header/>
            <Navbar setToken={setToken}/>
            <Outlet/>
            <Footer/>
        </div>
        )
     
}