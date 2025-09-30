import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the Routes and Route components
jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div data-testid="routes-mock">{children}</div>,
  Route: ({ path, element }) => <div data-testid={`route-mock-${path}`}>{element}</div>
}));

// Mock the components used in App
jest.mock('./components/Navbar', () => () => <nav data-testid="navbar-mock">Navbar Mock</nav>);
jest.mock('./auth/ProtectedRoute', () => ({ children }) => <div data-testid="protected-route-mock">{children}</div>);
jest.mock('./pages/Login', () => () => <div data-testid="login-mock">Login Mock</div>);
jest.mock('./pages/Dashboard', () => () => <div data-testid="dashboard-mock">Dashboard Mock</div>);
jest.mock('./pages/Upgrade', () => () => <div data-testid="upgrade-mock">Upgrade Mock</div>);
jest.mock('./pages/Zones', () => () => <div data-testid="zones-mock">Zones Mock</div>);
jest.mock('./pages/Reports', () => () => <div data-testid="reports-mock">Reports Mock</div>);
jest.mock('./pages/Thresholds', () => () => <div data-testid="thresholds-mock">Thresholds Mock</div>);
jest.mock('./pages/SearchReports', () => () => <div data-testid="search-reports-mock">SearchReports Mock</div>);
jest.mock('./pages/CustomizeDashboard', () => () => <div data-testid="customize-dashboard-mock">CustomizeDashboard Mock</div>);

describe('App Component Tests', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
  });

  test('contains all expected routes', () => {
    render(<App />);
    expect(screen.getByTestId('route-mock-/')).toBeInTheDocument();
    expect(screen.getByTestId('route-mock-/login')).toBeInTheDocument();
    expect(screen.getByTestId('route-mock-/upgrade')).toBeInTheDocument();
    expect(screen.getByTestId('route-mock-/zones')).toBeInTheDocument();
    expect(screen.getByTestId('route-mock-/reports')).toBeInTheDocument();
    expect(screen.getByTestId('route-mock-/thresholds')).toBeInTheDocument();
    expect(screen.getByTestId('route-mock-/search-reports')).toBeInTheDocument();
    expect(screen.getByTestId('route-mock-/customize')).toBeInTheDocument();
  });
  
  test('login route is not protected', () => {
    render(<App />);
    const loginRoute = screen.getByTestId('route-mock-/login');
    // Check that the login route doesn't contain the protected route
    expect(loginRoute.innerHTML).not.toContain('data-testid="protected-route-mock"');
  });
  
  test('dashboard route is protected', () => {
    render(<App />);
    const dashboardRoute = screen.getByTestId('route-mock-/');
    expect(dashboardRoute.innerHTML).toContain('protected-route-mock');
  });
});
