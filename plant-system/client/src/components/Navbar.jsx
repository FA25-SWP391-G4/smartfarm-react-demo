import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const isPremium = user?.role === "Premium" || user?.role === "Admin";
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call logout API and clear auth state
      await logout();
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-leaf me-2"></i>
          SmartFarm
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">{t('navigation.dashboard')}</Link>
                </li>
                
                {isPremium && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/zones">{t('navigation.zones')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/reports">{t('navigation.reports')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/thresholds">{t('navigation.thresholds')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/search-reports">{t('navigation.searchReports')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/customize-dashboard">{t('navigation.dashboard')}</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
          
          <div className="d-flex align-items-center">
            <div className="me-3">
              <LanguageSwitcher />
            </div>
            
            {isAuthenticated ? (
              <div className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle d-flex align-items-center border-0 bg-transparent" 
                  id="userDropdown" 
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {isPremium && (
                    <span className="badge bg-warning me-2">Premium</span>
                  )}
                  {user?.full_name || user?.name || "User"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="fas fa-user me-2"></i>
                      {t('navigation.profile')}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/change-password">
                      <i className="fas fa-key me-2"></i>
                      {t('navigation.changePassword')}
                    </Link>
                  </li>
                  {!isPremium && (
                    <li>
                      <Link className="dropdown-item" to="/upgrade">
                        <i className="fas fa-crown me-2"></i>
                        {t('navigation.upgrade')}
                      </Link>
                    </li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      {t('navigation.logout')}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn btn-outline-light me-2" to="/login">
                  {t('navigation.login')}
                </Link>
                <Link className="btn btn-light" to="/register">
                  {t('navigation.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
