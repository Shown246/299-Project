import Footer from "./Footer"
import NavBar from "./NavBar"
import {Outlet} from "react-router-dom"

const Root = () => {
  return (
    <>
      <NavBar/>
      <Outlet/>
      <div className="mt-auto">
        <Footer/>
      </div>
    </>
  )
}

export default Root