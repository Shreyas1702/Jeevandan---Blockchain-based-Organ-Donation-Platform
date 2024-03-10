import React from 'react'
import Footer from "./Footer";
import Navbar from './Navbar';

const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <div class="header">
        <div class="header__title">
          {/* <!-- <h1 onclick="alert('HTML alert')"> --> */}
          <h1 className="landingh1">
            Donate
            <span>&nbsp;and</span>
            <span class="highlight"> Save</span>
            someone's
            <span class="highlight"> Life</span>
          </h1>
          <h4>Your organs can help someone to start a new life</h4>
          <p
            class="btn btn--show-modal"
            style={{ color: "black", fontSize: "23px" }}
          >
            Contribute for a greater cause
          </p>
          <img
            id="i100"
            src="https://www.sriramakrishnahospital.com/wp-content/uploads/2021/09/Saving-Lives-with-Organ-Transplantation.jpg"
            class="header__img"
            alt="Minimalist bank items"
          />
        </div>

        <section class="section" id="section--1">
          <div class="section__title">
            <h2 class="section__description">Importance Of Donation</h2>
            <h3 class="section__header">
              Why Organ Donation is so Important ?
            </h3>
          </div>

          <div class="features">
            <img
              src="https://i.guim.co.uk/img/media/a051b9af02b2e8cc2b15eca7a29f555a16d0a7ee/0_73_2166_1300/master/2166.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=89e001b0d73822c0b76f9eeaf247e421"
              data-src="img/digital.jpg"
              alt="Computer"
              class="features__img lazy-img"
            />
            <div class="features__feature" style={{marginTop:"40px"}}>
              {/* <div class="features__icon">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-monitor"></use>
                </svg>
              </div> */}
              <h5 class="features__header" style={{color : "#5ec576"}}>Donor and Reciever Cards</h5>
              <p>
                Donor cards are tokens of compassion, signifying the noble act
                of giving life. They represent an individual's readiness to
                offer hope and healing through the gift of organs or tissues. On
                the other hand, receiver cards are emblems of gratitude and
                renewed life, a testament to the incredible impact of generosity
                and the transformative journey from despair to hope.
              </p>
            </div>

            <div class="features__feature" style={{marginTop:"30px"}}>
              <h5 class="features__header" style={{color : "#5ec576"}}>Impacting multiple Lives</h5>
              <p>
                The generosity of a single human organ can spark a chain of
                transformations, saving or enhancing multiple lives. It's a
                ripple effect of hope, where one gift touches many, echoing the
                power of compassion and selfless giving.
              </p>
            </div>
            <img
              src="https://st.adda247.com/https://wpassets.adda247.com/wp-content/uploads/multisite/sites/5/2020/11/30085955/organ.jpg"
              data-src="img/grow.jpg"
              alt="Plant"
              class="grow features__img lazy-img"
            />

            <img
              src="ODF7.png"
              data-src="img/card.jpg"
              alt="Credit card"
              class="features__img lazy-img"
            />
            <div class="features__feature" style={{marginTop:"50px"}}>
              <h5 class="features__header" style={{color : "#5ec576"}}>Organ Donation Rate</h5>
              <p>
                According to the survey , India faces a significant shortage of
                organ donors compared to many other nations. The vast population
                and high prevalence of organ failure accentuate the demand for
                organs. Cultural and awareness barriers contribute to the
                scarcity, emphasizing the urgent need for increased awareness
                campaigns and streamlined organ donation systems to save
                countless lives.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
      </div>
  )
}

export default LandingPage