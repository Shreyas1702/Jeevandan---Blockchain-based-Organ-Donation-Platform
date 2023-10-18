import React from 'react'

const footer = () => {
  return (
    <div className='footer'>
      <ul class="footer__nav">
        <li class="footer__item">
          <a class="footer__link" href="#">About</a>
        </li>
        <li class="footer__item">
          <a class="footer__link" href="#">Terms of Use</a>
        </li>
        <li class="footer__item">
          <a class="footer__link" href="#">Privacy Policy</a>
        </li>
        <li class="footer__item">
          <a class="footer__link" href="#">Contact Us</a>
        </li>
      </ul>
      <p class="footer__copyright">
        &copy; Copyright by 
        <a class="footer__link twitter-link" target="_blank" href="#"> Jeevandan</a>.
      </p>
      <p class="footer_p">Made by : <span> Shreyas Amey Shubham</span></p>
    </div>
  )
}

export default footer