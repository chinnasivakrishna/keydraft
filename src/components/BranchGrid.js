import React from 'react';
import '../styles/BranchGrid.css';

const BranchGrid = ({ branches, onEdit, onDelete, onView }) => {
  console.log('BranchGrid received branches:', branches); // Debug log

  if (!branches || branches.length === 0) {
    return <div>No branches found</div>;
  }

  return (
    <div className="branch-grid">
      {branches.map((branch) => (
        <div key={branch._id} className="branch-card">
          <h3>{branch.name}</h3>
          <p><strong>Address:</strong> {branch.address}</p>
          <p><strong>Phone:</strong> {branch.phone}</p>
          <p><strong>Email:</strong> {branch.email}</p>
          <p><strong>Manager:</strong> {branch.manager}</p>
          <p><strong>Status:</strong> {branch.status}</p>
          <div className="card-actions">
            <button onClick={() => onView(branch)}>View</button>
            <button onClick={() => onEdit(branch)}>Edit</button>
            <button onClick={() => onDelete(branch)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchGrid; 