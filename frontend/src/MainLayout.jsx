import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"

export function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md bg-body-tertiary no-select">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">SDEV255 Final</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" exact="true" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/courses">Full Course List</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/students">All Students</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <NavLink className="nav-link" to="/enroll">New Enrollment</NavLink>
                    </li>
                    <li className="dropdown-item">
                      <NavLink className="nav-link" to="/newcourse">New Course</NavLink>
                    </li>
                    <li className="dropdown-item">
                      <NavLink className="nav-link" to="/newstudent">New Student</NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </header>
  )
}
export function Footer() {
  const ToggleTheme = () => {
    let currentTheme = document.querySelector("body").dataset.bsTheme
    let newTheme = (currentTheme=="dark")?"light":"dark"
    document.querySelector("body").dataset.bsTheme = newTheme
    document.querySelector("#themeToggleIcon").innerHTML = (newTheme == "dark") ? "light_mode" : "dark_mode"
  }
  
  return (
    <footer>
      <nav className="navbar bg-body-tertiary fixed-bottom no-select">
        <div className="container-fluid">
          <span>Built by: <a target="_blank" href="https://ajcolson.com">Alex Colson</a>.</span>
          <div className="float-end no-select cursor-pointer border border-secondary rounded px-1"><span onClick={ToggleTheme} id="themeToggleIcon" className="pt-1 material-symbols-rounded">light_mode</span></div>
        </div>
      </nav>
    </footer>
  )
}

export function MainLayout() {
  return (
  <>
    <Header />
    <main className="pt-3">
      <Outlet />
    </main>
    <Footer />
    </>
  );
}