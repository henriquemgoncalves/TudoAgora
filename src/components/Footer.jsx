import React from 'react'
import '../styles/components/footer.sass'
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa"

const Footer = () => {
  return (
    <footer id='footer'>
        <h2>
            &copy;{new Date().getFullYear()} - Desenvolvido por Henrique.
        </h2>
        <div className="social">
            <a href='https://www.linkedin.com/in/henrique-madruga-gonçalves-044a072aa' target='_blank' rel='noopener noreferrer'><FaLinkedin/></a> 
            <a href='https://www.github.com/henriquemgoncalves' target='_blank' rel='noopener noreferrer'><FaGithub/></a> 
            <a href='https://wa.me/5511940007976' target='_blank' rel='noopener noreferrer'><FaWhatsapp/></a> 
        </div>

    </footer>
  )
}

export default Footer
