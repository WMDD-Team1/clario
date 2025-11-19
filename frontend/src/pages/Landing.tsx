import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { sendContactMessage } from '@api/services/contactService';
import './Landing.css';

export const Landing = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth Scroll (React 방식)
  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Login / Signup
  const handleAuthAction = (type) => {
    window.parent.postMessage({ action: type }, '*');
  };

  // Contact Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      await sendContactMessage(payload);
      alert('Message sent!');
      form.reset();
    } catch (err) {
      alert('Failed to send. Try again.');
    }
  };

  return (
    <div className='landing'>
      {/* HEADER */}
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <img src="images/logo.png" alt="Clario logo" className="logo" />
          </div>

          <div className="nav-wrapper">
            <nav className="desktop-nav">
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>
                About Us
              </a>
              <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')}>
                Features
              </a>
              <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')}>
                Pricing
              </a>
              <a href="#team" onClick={(e) => handleSmoothScroll(e, 'team')}>
                Team
              </a>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>
                Contact Us
              </a>
            </nav>

            <div className="auth-buttons">
              <button className="btn btn-login" onClick={() => loginWithRedirect()}>
                Login
              </button>
              <button
                className="btn btn-signup"
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: {
                      screen_hint: 'signup',
                    },
                  })
                }
              >
                Sign Up
              </button>
            </div>

            <button
              className={`mobile-menu-toggle ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <svg className="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>
            About Us
          </a>
          <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')}>
            Features
          </a>
          <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')}>
            Pricing
          </a>
          <a href="#team" onClick={(e) => handleSmoothScroll(e, 'team')}>
            Team
          </a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>
            Contact Us
          </a>

          <div className="mobile-auth-buttons">
            <button className="btn btn-login" onClick={() => handleAuthAction('login')}>
              Login
            </button>
            <button className="btn btn-signup" onClick={() => handleAuthAction('signup')}>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section" id="about">
        <div className="hero-container">
          <div className="hero-image-container">
            <div className="hero-content">
              <h1 className="hero-title">All Your Freelance Work. One Smart Dashboard.</h1>
              <p className="hero-description">
                Manage projects, track time, handle invoices, and collaborate seamlessly.
              </p>
            </div>
            <img src="images/Hero_Section.png" alt="Dashboard mockup" className="hero-image" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section" id="features">
        <div className="features-container">
          <div className="features-grid">
            <div className="features-text">
              <div className="section-header">
                <h2 className="section-title white">Features Designed for Modern Freelancers</h2>
                <p className="section-description white">
                  Powerful features designed to simplify your freelance workflow
                </p>
              </div>

              <div className="features-list">
                <div className="features-row">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <img src="images/project-management.svg" className="feature-svg-icon" />
                    </div>
                    <h4 className="feature-title">Project Management</h4>
                    <p className="feature-description">
                      Automate tasks and stay on top of deadlines.
                    </p>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon">
                      <img src="images/AI_Analysis.svg" className="feature-svg-icon" />
                    </div>
                    <h4 className="feature-title">AI Analysis</h4>
                    <p className="feature-description">Turn complex data into insights.</p>
                  </div>
                </div>

                <div className="features-row">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <img src="images/contract.svg" className="feature-svg-icon" />
                    </div>
                    <h4 className="feature-title">Smart Contract Management</h4>
                    <p className="feature-description">Create, organize, and track contracts.</p>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon">
                      <img src="images/financial.svg" className="feature-svg-icon" />
                    </div>
                    <h4 className="feature-title">Income & Expense Tracking</h4>
                    <p className="feature-description">Monitor your cash flow in real-time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-image-container">
              <img src="images/feature_image.png" className="features-image" />
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div className="feature-highlight">
            <div className="feature-highlight-image">
              <img src="images/manage_project.png" className="feature-image" />
            </div>
            <div className="feature-highlight-text">
              <h2 className="section-title white">Manage Projects. Build Contracts.</h2>
              <p className="section-description white">
                Create contracts, track milestones, manage workflow.
              </p>
            </div>
          </div>

          <div className="feature-highlight reverse">
            <div className="feature-highlight-image">
              <img src="images/master_your_finance.png" className="feature-image" />
            </div>
            <div className="feature-highlight-text">
              <h2 className="section-title white">Master Your Finances</h2>
              <p className="section-description white">
                Understand your cash flow and make smarter decisions.
              </p>
            </div>
          </div>

          <div className="feature-highlight">
            <div className="feature-highlight-image">
              <img src="images/AI_Assistance.png" className="feature-image" />
            </div>
            <div className="feature-highlight-text">
              <h2 className="section-title white">AI Assistances</h2>
              <p className="section-description white">
                Identify risks and get smart recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mode-section">
        <div className="mode-container">
          <img src="images/Project_Managment.png" alt="Project mockup" className="mode-image" />
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="pricing-section" id="pricing">
        <div className="pricing-container">
          <div className="section-header text-center">
            <h2 className="section-title blue">Plans designed to grow with your work</h2>
            <p className="section-description">
              Begin with the essentials and unlock advanced tools as you scale.
            </p>
          </div>

          <div className="pricing-cards">
            <ul className="pricing-cards">
              {/* Starter */}
              <li className="pricing-card">
                <div className="pricing-header">
                  <div className="pricing-price">$10/mth</div>
                  <div className="pricing-plan">Starter Plan</div>
                </div>
                <div className="pricing-features">
                  <ul>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Track income and expenses
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Upload and store up to 10 documents
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Access to free financial dashboard
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Email support
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Smart AI insights for contracts
                    </li>
                  </ul>
                </div>
                <button className="pricing-btn">Get Started</button>
              </li>

              {/* Pro */}
              <li className="pricing-card featured">
                <div className="pricing-header">
                  <div className="pricing-price">$39/mth</div>
                  <div className="pricing-plan">Pro Plan</div>
                </div>
                <div className="pricing-features">
                  <ul>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Everything in Starter, plus
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Unlimited projects & clients
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Smart contract review (AI insights)
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Automated categorization
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Multi-currency support
                    </li>
                  </ul>
                </div>
                <button className="pricing-btn">Get Started</button>
              </li>

              {/* Custom */}
              <li className="pricing-card">
                <div className="pricing-header">
                  <div className="pricing-price">$99/mth</div>
                  <div className="pricing-plan">Custom</div>
                </div>
                <div className="pricing-features">
                  <ul>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Everything in Starter + Pro
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Real-time income insights
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Predictive agreements
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Team permissions
                    </li>
                    <li>
                      <img src="images/Check_icon.svg" className="check-icon" />
                      Priority support
                    </li>
                  </ul>
                </div>
                <button className="pricing-btn">Get Started</button>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section" id="team">
        <div className="team-container">
          <div className="section-header text-center">
            <h2 className="section-title blue">Let's meet our Team</h2>
            <p className="section-description">
              We design with purpose, build with passion, and deliver with pride.
            </p>
          </div>

          <div className="team-grid">
            <div className="team-member">
              <img src="images/paras.png" className="team-photo" />
              <h4 className="team-name">Paras Sharma</h4>
              <div className="team-role-container">
                <a
                  href="https://www.linkedin.com/in/paaras-sharma-802074227"
                  className="linkedin-link"
                >
                  <img src="images/LinkedIn_icon.png" className="linkedin-icon" />
                </a>
                <span className="team-role">Developer</span>
              </div>
            </div>

            <div className="team-member">
              <img src="images/yahui.png" className="team-photo" />
              <h4 className="team-name">Yahui Xu</h4>
              <div className="team-role-container">
                <a href="https://www.linkedin.com/in/yahui-xu" className="linkedin-link">
                  <img src="images/LinkedIn_icon.png" className="linkedin-icon" />
                </a>
                <span className="team-role">Developer</span>
              </div>
            </div>

            <div className="team-member">
              <img src="images/daniel.png" className="team-photo" />
              <h4 className="team-name">Daniel Velastegui</h4>
              <div className="team-role-container">
                <a href="https://www.linkedin.com/in/velasteguidaniel" className="linkedin-link">
                  <img src="images/LinkedIn_icon.png" className="linkedin-icon" />
                </a>
                <span className="team-role">Developer</span>
              </div>
            </div>

            <div className="team-member">
              <img src="images/bitna.png" className="team-photo" />
              <h4 className="team-name">Bitna Lee</h4>
              <div className="team-role-container">
                <a
                  href="https://www.linkedin.com/in/bitna-dev/?locale=en"
                  className="linkedin-link"
                >
                  <img src="images/LinkedIn_icon.png" className="linkedin-icon" />
                </a>
                <span className="team-role">Developer Lead</span>
              </div>
            </div>

            <div className="team-member">
              <img src="images/kentaro.png" className="team-photo" />
              <h4 className="team-name">Kentaro Muratta</h4>
              <div className="team-role-container">
                <a href="https://www.linkedin.com/in/kentaromuratta" className="linkedin-link">
                  <img src="images/LinkedIn_icon.png" className="linkedin-icon" />
                </a>
                <span className="team-role">Project Lead (Designer)</span>
              </div>
            </div>

            <div className="team-member">
              <img src="images/arjun.png" className="team-photo" />
              <h4 className="team-name">Arjun Manoj</h4>
              <div className="team-role-container">
                <a href="https://www.linkedin.com/in/lostinthegoodvibes" className="linkedin-link">
                  <img src="images/LinkedIn_icon.png" className="linkedin-icon" />
                </a>
                <span className="team-role">Designer</span>
              </div>
            </div>

            <div className="team-member">
              <img src="images/mann.png" className="team-photo" />
              <h4 className="team-name">Mann Modi</h4>
              <div className="team-role-container">
                <a href="https://www.linkedin.com/in/mannmodi" className="linkedin-link">
                  <img src="images/LinkedIn_icon.png" className="linkedin-icon" />
                </a>
                <span className="team-role">Designer</span>
              </div>
            </div>

            <div className="team-member">
              <img src="images/theertha.png" className="team-photo" />
              <h4 className="team-name">Theertha Vinod</h4>
              <div className="team-role-container">
                <a
                  href="https://www.linkedin.com/in/theertha-vinod-041564239"
                  className="linkedin-link"
                >
                  <img src="images/LinkedIn_icon.png" className="linkedin-icon" />
                </a>
                <span className="team-role">Designer</span>
              </div>
            </div>

            <div className="team-member">
              <img src="images/ankit.png" className="team-photo" />
              <h4 className="team-name">Ankit Kate</h4>
              <div className="team-role-container">
                <a href="https://www.linkedin.com/in/ankitkate/" className="linkedin-link">
                  <img src="images/LinkedIn_icon.png" className="linkedin-icon" />
                </a>
                <span className="team-role">Designer Lead</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section" id="contact">
        <div className="contact-form-wrapper">
          <div className="contact-form-container">
            <div className="section-header">
              <h2 className="section-title white">Let&apos;s Connect</h2>
              <p className="section-description white">We&apos;d love to hear from you.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" type="text" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" required />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea name="message" required />
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="contact-brand-wrapper">
          <div className="brand-logo-large">
            <img src="images/contact_background.svg" className="brand-logo-image" />
            <div className="brand-overlay-content">
              <div className="overlay-top-content">
                <img src="images/clario_contact.png" className="overlay-logo" />
                <p className="overlay-text-top">Where Freelancers and Clients Thrive</p>
              </div>
              <p className="overlay-text-bottom">© 2025 Clario. All rights reserved.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
