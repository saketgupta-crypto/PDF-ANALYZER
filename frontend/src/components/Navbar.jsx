function Navbar({ onGetStarted }) {
  return (
    <nav className="navbar">

      <div className="nav-logo">
        <div className="logo-mark">
          Q
        </div>

        <span>
          PDF<span>Q</span>A
        </span>
      </div>


      <div className="nav-links">

        <a href="#workspace">
          Workspace
        </a>

        <a href="#features">
          Features
        </a>

        <a href="#how-it-works">
          How it works
        </a>

      </div>


      <button
        className="nav-button"
        onClick={onGetStarted}
      >
        Get started
        <span>→</span>
      </button>

    </nav>
  );
}

export default Navbar;