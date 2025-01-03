import React from 'react';
import '../styles/BranchTable.css';

const BranchTable = ({ branches, onEdit, onDelete, onView }) => {
  console.log('BranchTable received branches:', branches); // Debug log

  if (!branches || branches.length === 0) {
    return <div>No branches found</div>;
  }

  return (
    <table className="branch-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Manager</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {branches.map((branch) => (
          <tr key={branch._id}>
            <td>{branch.name}</td>
            <td>{branch.address}</td>
            <td>{branch.phone}</td>
            <td>{branch.email}</td>
            <td>{branch.manager}</td>
            <td>{branch.status}</td>
            <td>
              <button onClick={() => onView(branch)}>View</button>
              <button onClick={() => onEdit(branch)}>Edit</button>
              <button onClick={() => onDelete(branch)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BranchTable; 