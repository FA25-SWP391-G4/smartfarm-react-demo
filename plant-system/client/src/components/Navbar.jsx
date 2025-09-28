import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { user, logout } = useAuth();
  const isPremium = user?.role === "Premium" || user?.role === "Admin";
  const { t } = useTranslation();

  return (
    <nav className="navbar navbar-expand bg-light px-3">
      <Link className="navbar-brand" to="/">SmartFarm</Link>
      <div className="navbar-nav">
        {isPremium && <>
          <Link className="nav-link" to="/zones">{t('navigation.zones')}</Link>
          <Link className="nav-link" to="/reports">{t('navigation.reports')}</Link>
          <Link className="nav-link" to="/thresholds">{t('navigation.thresholds')}</Link>
          <Link className="nav-link" to="/search-reports">{t('navigation.searchReports')}</Link>
          <Link className="nav-link" to="/customize">{t('navigation.dashboard')}</Link>
        </>}
      </div>
      <div className="ms-auto d-flex align-items-center">
        <div className="me-3">
          <LanguageSwitcher />
        </div>
        {user ? (
          <>
            <span className="me-2">{user.name} ({user.role})</span>
            {user.role==="Regular" && <Link className="btn btn-sm btn-warning me-2" to="/upgrade">{t('navigation.upgrade')}</Link>}
            <button className="btn btn-sm btn-outline-secondary" onClick={logout}>{t('navigation.logout')}</button>
          </>
        ) : <Link className="btn btn-sm btn-primary" to="/login">{t('navigation.login')}</Link>}
      </div>
    </nav>
  );
}
