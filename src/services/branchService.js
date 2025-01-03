import axios from 'axios';

const API_BASE_URL = 'https://keydraft-backend-kuge.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const branchService = {
  getAllBranches: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/branches`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get branches error:', error);
      throw new Error(error.message || 'Failed to fetch branches');
    }
  },

  createBranch: async (branchData) => {
    try {
      // Validate required fields
      if (!branchData.manager) {
        throw new Error('Manager is required');
      }

      // Create a new object with the correct structure
      const dataToSend = {
        name: branchData.name,
        address: branchData.address,
        manager: branchData.manager.trim(), // Ensure manager is a trimmed string
        phone: branchData.phone || '',
        email: branchData.email || '',
        openingHours: branchData.openingHours || '',
        facilities: branchData.facilities || '',
        status: branchData.status || 'active'
      };

      console.log('Creating branch with data:', dataToSend);

      const response = await fetch(`${API_BASE_URL}/branches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success response:', data);
      return data;
    } catch (error) {
      console.error('Create branch error:', error);
      throw error;
    }
  },

  updateBranch: async (id, branchData) => {
    try {
      // Validate required fields
      if (!branchData.manager) {
        throw new Error('Manager is required');
      }

      // Create a new object with the correct structure
      const dataToSend = {
        name: branchData.name,
        address: branchData.address,
        manager: branchData.manager.trim(), // Ensure manager is a trimmed string
        phone: branchData.phone || '',
        email: branchData.email || '',
        openingHours: branchData.openingHours || '',
        facilities: branchData.facilities || '',
        status: branchData.status || 'active'
      };

      const response = await fetch(`${API_BASE_URL}/branches/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Update branch error:', error);
      throw error;
    }
  },

  deleteBranch: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/branches/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Delete branch error:', error);
      throw new Error(error.message || 'Failed to delete branch');
    }
  },

  bulkImport: async (branches) => {
    try {
      const response = await axiosInstance.post('/bulk', branches);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to import branches');
    }
  },
}; 