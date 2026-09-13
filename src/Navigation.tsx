import { NavLink } from 'react-router-dom'

function Navigation(){
    const navLinkClass = ({ isActive }: { isActive: boolean }) => `btn btn-outline-success me-2 ${isActive ? "active" : ""}`;

return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark primary-nav">
        <div className="container nav-content-container">
            <NavLink className="navbar-brand" to="/trainings">
                <span className="brand-icon me-2">Zoox</span>
                </NavLink>
                
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink to="/audits" className={navLinkClass}>
                        Audits
                        </NavLink>
                    </li>
                <li className="nav-item">
                    <NavLink to="/trainings" className="btn btn-outline-success me-2">
                    Trainings
                    </NavLink>
                </li>
            
                    <li className="nav-item">
                        <NavLink to="/users" className={navLinkClass}>
                        Users
                        </NavLink>
                    </li>
                </ul>
            </div>        
        </div>
    </nav>
    )
}

export default Navigation
