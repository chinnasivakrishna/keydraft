import React, { useState, useEffect } from 'react';
import '../styles/BranchForm.css';

const BranchForm = ({ branch, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    branchCode: '',
    shortName: '',
    locality: '',
    city: '',
    state: '',
    manager: '',
    phone: '',
    panNo: '',
    gstin: '',
    status: 'active'
  });

  useEffect(() => {
    if (branch) {
      setFormData({
        name: branch.name || '',
        branchCode: branch.branchCode || '',
        shortName: branch.shortName || '',
        locality: branch.locality || '',
        city: branch.city || '',
        state: branch.state || '',
        manager: branch.manager || '',
        phone: branch.phone || '',
        panNo: branch.panNo || '',
        gstin: branch.gstin || '',
        status: branch.status || 'active'
      });
    }
  }, [branch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2 className="form-title">{branch ? 'Edit Branch' : 'Add New Branch'}</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label required-field">Branch Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label required-field">Branch Code</label>
            <input
              type="text"
              name="branchCode"
              value={formData.branchCode}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Branch Short Name</label>
            <input
              type="text"
              name="shortName"
              value={formData.shortName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Locality</label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label required-field">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label required-field">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label required-field">Manager</label>
            <input
              type="text"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Contact Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label">PAN No</label>
            <input
              type="text"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label">GSTIN</label>
            <input
              type="text"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-input"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn btn-submit">
              {branch ? 'Update Branch' : 'Create Branch'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BranchForm; 