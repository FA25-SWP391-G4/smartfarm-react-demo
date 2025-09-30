// src/tests/api-mapping.test.js
import axios from 'axios';
import authApi from '../api/authApi';

// Mock axios
jest.mock('axios');

// Helper function to check API path consistency
const checkApiMapping = (frontendFunction, expectedBackendPath, requestData, httpMethod = 'post') => {
  // Setup axios mock response
  axios[httpMethod].mockResolvedValue({ data: { success: true } });
  
  // Call the frontend API function
  return frontendFunction(requestData)
    .then(response => {
      // Verify axios was called with the expected path
      expect(axios[httpMethod]).toHaveBeenCalledWith(
        expectedBackendPath,
        expect.anything()
      );
      return response;
    });
};

describe('API Mapping Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('Authentication API Mapping', () => {
    test('register() maps to POST /auth/register', () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        full_name: 'Test User'
      };
      
      return checkApiMapping(
        () => authApi.register(
          userData.email, 
          userData.password, 
          userData.confirmPassword,
          userData.full_name
        ),
        '/auth/register',
        userData
      );
    });
    
    test('login() maps to POST /auth/login', () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      return checkApiMapping(
        () => authApi.login(credentials.email, credentials.password),
        '/auth/login',
        credentials
      );
    });
    
    test('logout() maps to POST /auth/logout', () => {
      return checkApiMapping(
        () => authApi.logout(),
        '/auth/logout',
        {}
      );
    });
    
    test('changePassword() maps to PUT /auth/change-password', () => {
      const passwordData = {
        currentPassword: 'oldPassword123',
        newPassword: 'newPassword456',
      };
      
      return checkApiMapping(
        () => authApi.changePassword(passwordData),
        '/auth/change-password',
        passwordData,
        'put'
      );
    });
    
    test('forgotPassword() maps to POST /auth/forgot-password', () => {
      const email = 'test@example.com';
      
      return checkApiMapping(
        () => authApi.forgotPassword(email),
        '/auth/forgot-password',
        { email }
      );
    });
    
    test('resetPassword() maps to POST /auth/reset-password', () => {
      const resetData = {
        token: 'valid-reset-token',
        newPassword: 'newPassword123'
      };
      
      return checkApiMapping(
        () => authApi.resetPassword(resetData.token, resetData.newPassword),
        '/auth/reset-password',
        resetData
      );
    });
  });
});
