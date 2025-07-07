import Logo from "../assets/logo.png"

const Footer = () => {
  return (
   <footer>
    <img src={Logo} alt="Logo" />
        <span>Made by <b>Rishabh Mishra</b> &copy; {new Date().getFullYear()} all rights reserved</span>
   </footer>
  )
}

export default Footer
