import { MouseEvent, useState } from 'react';
import { sendContactMessage } from '@api/services/contactService';
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';

export const Landing = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
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
    <div className="landing">
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
              <button className="btn btn-login" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="btn btn-signup" onClick={() => navigate('/signup')}>
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
            <button className="btn btn-login" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn btn-signup" onClick={() => navigate('/signup')}>
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
                Clario helps freelancers and contractors manage projects, contracts, income, and
                expenses — all in one organized place. Stay focused on work that matters while
                Clario handles the details
              </p>
              <div className="btn-group ">
                <Button
                  className="bg-[#F5F9FF] border-2 border-[#CEDEF8] flex gap-[10px]"
                  onClick={() => navigate('/')}
                >
                  Download Proposal
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_3084_14440)">
                      <path
                        d="M0 19.2918V16.391C0.188 15.7366 1.1352 15.775 1.2176 16.4598C1.4384 18.2902 0.5832 20.5334 3.0864 21.235C8.9976 21.3494 14.9576 21.3494 20.8688 21.235C21.8952 20.9782 22.6496 20.0902 22.7384 19.0334C22.8056 18.2286 22.6248 17.1758 22.7424 16.4166C22.8416 15.7782 23.828 15.7334 23.9448 16.4246C24.0448 17.0198 24 18.9678 23.888 19.5742C23.6256 20.999 22.4256 22.1758 21.0104 22.4518C15.016 22.5702 8.98 22.5534 2.984 22.4598C1.7792 22.2214 0.7712 21.4174 0.288 20.2902L0 19.2918Z"
                        fill="#667085"
                      />
                      <path
                        d="M12.5863 13.8647C12.8167 13.7055 13.0327 13.5127 13.2423 13.3271C14.5135 12.1999 15.7623 10.9807 17.0559 9.88869C17.1271 9.82789 17.3639 9.61669 17.4175 9.59509C18.0479 9.33829 18.5935 10.0519 18.1319 10.5903L12.9359 15.2199C12.3791 15.6631 11.5767 15.6631 11.0199 15.2199L5.82308 10.5911C5.35508 10.0199 5.93428 9.30549 6.59508 9.63189L11.3695 13.8639V1.95669C11.3695 1.69029 11.7487 1.45509 11.9999 1.46309C12.2367 1.47029 12.5863 1.71029 12.5863 1.95669V13.8647Z"
                        fill="#667085"
                      />
                      <path
                        d="M4.24564 18.3214L19.5832 18.3086C20.3696 18.3454 20.5256 19.3638 19.7224 19.5278H4.23364C3.50244 19.3894 3.54404 18.475 4.24564 18.3214Z"
                        fill="#667085"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3084_14440">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Button>
                <Button
                  className="bg-[#F5F9FF] border-2 border-[#CEDEF8] flex gap-[10px]"
                  onClick={() =>
                    window.open('https://github.com/WMDD-Team1/clario/tree/main', '_blank')
                  }
                >
                  View Code
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_2897_17069)">
                      <path
                        d="M24 17.4138C23.9064 18.1498 23.0992 18.7906 22.3712 18.7906H14.7768C15.1688 19.545 15.644 20.273 15.0048 21.0618C14.6616 21.4858 14.2192 21.5626 13.7 21.593C12.6888 21.653 11.2656 21.6538 10.2544 21.593C9.6584 21.557 9.1752 21.4258 8.8656 20.8706C8.424 20.077 8.88 19.4978 9.224 18.7906H1.6304C0.8136 18.7906 0.0576 18.1178 0.0024 17.2978L0 3.93939C0.0784 2.93779 0.852 2.40819 1.812 2.40099H16.4536C17.0096 2.37059 17.336 2.94419 16.8304 3.28659L1.7696 3.32179C1.4952 3.30899 0.92 3.59619 0.92 3.89459V15.485H23.0368V3.89539C23.0368 3.79459 22.8328 3.51859 22.7392 3.45939C22.3184 3.19139 21.2848 3.38419 20.7648 3.32339C20.2448 3.26259 20.2176 2.48819 20.8632 2.40979C21.9712 2.27459 23.8192 2.35219 24.0008 3.78179V17.4146L24 17.4138ZM23.036 16.4034H0.9192V17.2986C0.9192 17.6234 1.5632 17.9122 1.8576 17.8746H22.1888C22.4912 17.9034 23.036 17.6314 23.036 17.2986V16.4034ZM13.7144 18.7978L10.3112 18.7882C10.0744 19.3738 8.9408 20.557 10.212 20.6714C11.112 20.7522 12.844 20.7506 13.7464 20.6738C14.0496 20.6482 14.3904 20.5298 14.3544 20.1554C14.3224 19.817 13.804 19.1682 13.7144 18.7978Z"
                        fill="#667085"
                      />
                      <path
                        d="M5.2029 10.4207C4.6069 9.75025 4.6725 8.86945 5.3741 8.30625C5.9333 7.85825 7.3677 6.77905 7.9613 6.48785C8.4989 6.22465 8.8909 6.71505 8.5605 7.17905C7.7909 7.85825 6.6877 8.37745 5.9437 9.05985C5.7613 9.22705 5.7373 9.41105 5.8173 9.64465C6.6533 10.4079 7.6629 10.9791 8.5605 11.6743C8.8861 12.0455 8.5325 12.6103 8.0437 12.4207C7.9717 12.3927 7.7285 12.2343 7.6429 12.1799C6.8021 11.6471 6.0589 10.9367 5.2029 10.4207Z"
                        fill="#667085"
                      />
                      <path
                        d="M18.7519 10.418C18.2751 10.8668 17.3487 11.4852 16.7847 11.87C16.6119 11.9876 16.1007 12.3644 15.9575 12.4196C15.4663 12.6092 15.1207 12.0524 15.4407 11.6732C16.2111 11.0052 17.2607 10.506 18.0111 9.838C18.2679 9.61 18.3247 9.306 18.0575 9.0596L15.4415 7.178C15.0959 6.758 15.5023 6.2108 16.0407 6.4868C16.6327 6.79 17.6279 7.582 18.1879 8.0116C18.8543 8.5228 19.3119 8.7516 19.1791 9.7204C19.1391 10.0108 18.9543 10.2284 18.7527 10.418H18.7519Z"
                        fill="#667085"
                      />
                      <path
                        d="M12.236 10.0511C11.9144 10.6959 11.5552 11.4911 11.2064 12.1183C10.8576 12.7455 10.1904 12.3903 10.2904 11.8919C10.9232 10.6071 11.5 9.29034 12.1496 8.01434C12.1784 7.95674 12.2368 7.95754 12.2672 7.89834C12.4488 7.54474 12.6776 6.85034 12.9032 6.56234C13.1968 6.18714 13.8136 6.51434 13.7136 6.95834C13.2208 7.98794 12.7472 9.02954 12.2368 10.0503L12.236 10.0511Z"
                        fill="#667085"
                      />
                      <path
                        d="M18.3722 3.21437C17.9138 2.75517 18.6874 2.12237 19.0914 2.56317C19.5226 3.03277 18.7866 3.62877 18.3722 3.21437Z"
                        fill="#667085"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2897_17069">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Button>
                <Button
                  className="bg-[#F5F9FF] border-2 border-[#CEDEF8] flex gap-[10px]"
                  onClick={() =>
                    window.open(
                      'https://www.figma.com/design/wS7LFcfSmH6QPX994ivqHh/Mockups?node-id=0-1&p=f&t=1iXRcwYzj5JTXnIi-0',
                      '_blank',
                    )
                  }
                >
                  UI/UX Files
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_2894_17051)">
                      <path
                        d="M19.5932 0L19.9996 0.132C21.3724 1.032 22.426 2.4536 23.6436 3.5648C24.1404 4.296 24.1148 5.228 23.5756 5.9272L8.57635 20.924L0.613953 23.9768C0.329953 24.0576 0.131553 23.9064 0.00195312 23.6688V23.3872L3.09475 15.396L18.022 0.4672C18.3084 0.2072 18.6684 0.0992 19.0308 0H19.5932ZM18.6324 1.172C17.9212 1.6952 17.2372 2.7104 16.522 3.28L16.4564 3.392L20.6412 7.5432L22.8268 5.3672C23.1572 4.8856 23.1476 4.456 22.7812 4.0072C21.9892 3.036 20.7972 2.1624 19.9684 1.196C19.8196 1.068 19.6604 0.9792 19.4636 0.9512C19.154 0.908 18.8812 0.9896 18.6324 1.1728V1.172ZM14.7196 5.0856L18.9132 9.2792L19.9668 8.2256L15.7732 4.032L14.7196 5.0856ZM4.12675 15.6776L8.32035 19.8712L18.23 9.9528L14.0788 5.768L4.12675 15.6776ZM2.34115 20.1312L3.92195 21.6912L7.45395 20.388L3.61155 16.5448L2.34115 20.1312ZM2.95315 22.052L1.94675 21.0456L1.31395 22.6848L2.95315 22.052Z"
                        fill="#667085"
                      />
                      <path
                        d="M18.7147 23.0706L7.24111 23.0586C6.65391 23.1258 6.64111 23.9266 7.24111 23.9978H18.6323C19.1971 23.9378 19.2571 23.2186 18.7139 23.0698L18.7147 23.0706Z"
                        fill="#667085"
                      />
                      <path
                        d="M5.30907 23.0696C4.57627 22.9488 4.58507 24.0784 5.26987 23.9952C5.80187 23.9304 5.82427 23.1544 5.30907 23.0696Z"
                        fill="#667085"
                      />
                      <path
                        d="M13.6061 8.54072C13.4629 8.50872 13.3045 8.52232 13.1941 8.62472L9.58287 12.2783C9.43807 12.7263 9.97327 13.0743 10.3357 12.7967L13.8277 9.30472C14.0293 9.06952 13.9197 8.61192 13.6069 8.54152L13.6061 8.54072Z"
                        fill="#667085"
                      />
                      <path
                        d="M8.21422 13.8359C7.58382 13.7591 7.44382 14.8383 8.22702 14.7663C8.75422 14.7183 8.74622 13.9007 8.21422 13.8359Z"
                        fill="#667085"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2894_17051">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Button>
              </div>
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
            <h2 className="section-title blue">Let&apos;s meet our Team</h2>
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
