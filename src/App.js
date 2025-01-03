import { useState, useEffect } from 'react';
import './App.css';
import BranchTable from './components/BranchTable';
import { branchService } from './services/branchService';
import BranchForm from './components/BranchForm';
import BranchGrid from './components/BranchGrid';
import { excelService } from './services/excelService';
import { filterBranches } from './utils/searchUtils';
import Modal from './components/Modal';

function App() {
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [showForm, setShowForm] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    const filtered = filterBranches(branches, searchTerm);
    console.log('Filtered branches:', filtered);
    setFilteredBranches(filtered);
    setTotalPages(Math.ceil(filtered.length / rowsPerPage));
  }, [branches, searchTerm, rowsPerPage]);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const data = await branchService.getAllBranches();
      console.log('Fetched branches:', data);
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
      // TODO: Add error handling
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (branchData) => {
    try {
      console.log('Attempting to create branch with:', branchData);
      
      if (!branchData.manager) {
        throw new Error('Manager is required');
      }

      const newBranch = await branchService.createBranch({
        ...branchData,
        manager: branchData.manager // Ensure manager is passed
      });
      
      console.log('Created branch:', newBranch);
      setBranches(prevBranches => [...prevBranches, newBranch]);
      setShowForm(false);
      alert('Branch created successfully!');
    } catch (error) {
      console.error('Error creating branch:', error);
      alert(error.message || 'Error creating branch');
    }
  };

  const handleEdit = async (id, branchData) => {
    try {
      console.log('Attempting to update branch:', id, branchData);
      
      if (!branchData.manager) {
        throw new Error('Manager is required');
      }

      const updatedBranch = await branchService.updateBranch(id, {
        ...branchData,
        manager: branchData.manager // Ensure manager is passed
      });
      
      console.log('Updated branch:', updatedBranch);
      setBranches(prevBranches =>
        prevBranches.map(branch =>
          branch._id === id ? updatedBranch : branch
        )
      );
      setShowForm(false);
      setSelectedBranch(null);
      alert('Branch updated successfully!');
    } catch (error) {
      console.error('Error updating branch:', error);
      alert(error.message || 'Error updating branch');
    }
  };

  const handleDelete = async (branch) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        await branchService.deleteBranch(branch._id);
        setBranches(prevBranches =>
          prevBranches.filter(b => b._id !== branch._id)
        );
        alert('Branch deleted successfully!');
      } catch (error) {
        console.error('Error deleting branch:', error);
        alert('Error deleting branch: ' + error.message);
      }
    }
  };

  const handleView = (branch) => {
    // TODO: Implement view functionality
    console.log('View branch:', branch);
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await excelService.exportToExcel(branches);
    } catch (error) {
      console.error('Error exporting data:', error);
      // TODO: Show error notification
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsImporting(true);
      const data = await excelService.importFromExcel(file);
      await fetchBranches(); // Refresh the list after import
      alert('Data imported successfully!');
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Error importing data: ' + error.message);
    } finally {
      setIsImporting(false);
      event.target.value = ''; // Reset file input
    }
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredBranches.slice(startIndex, startIndex + rowsPerPage);
    console.log('Paginated data:', paginatedData);
    return paginatedData;
  };

  const handleSubmit = async (branchData) => {
    try {
      if (selectedBranch) {
        await handleEdit(selectedBranch._id, branchData);
      } else {
        await handleCreate(branchData);
      }
    } catch (error) {
      console.error('Error submitting branch:', error);
      alert(error.message || 'Error submitting branch. Please try again.');
    }
  };

  // Add this function to handle edit button clicks
  const handleEditClick = (branch) => {
    // Transform the data structure for the form
    const formData = {
      ...branch,
      manager: branch.manager, // Ensure manager is passed correctly
    };
    setSelectedBranch(formData);
    setShowForm(true);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Branch Management System</h1>
        <div className="header-controls">
          <button onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
            {viewMode === 'list' ? 'Grid View' : 'List View'}
          </button>
          <input
            type="file"
            id="import-excel"
            accept=".xlsx,.xls"
            style={{ display: 'none' }}
            onChange={handleImport}
          />
          <button 
            onClick={() => document.getElementById('import-excel').click()}
            disabled={isImporting}
          >
            {isImporting ? 'Importing...' : 'Import Excel'}
          </button>
          <button onClick={handleExport} disabled={isExporting}>
            {isExporting ? 'Exporting...' : 'Export Excel'}
          </button>
        </div>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search branches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="actions">
        <button onClick={() => setShowForm(true)}>Add New Branch</button>
      </div>

      <div className={`branch-container ${viewMode}`}>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            {viewMode === 'list' ? (
              <BranchTable
                branches={getPaginatedData()}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                onView={handleView}
              />
            ) : (
              <BranchGrid
                branches={getPaginatedData()}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                onView={handleView}
              />
            )}
          </>
        )}
      </div>

      <div className="pagination">
        <span>Rows per page: {rowsPerPage}</span>
        <span>
          {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
            currentPage * rowsPerPage,
            filteredBranches.length
          )} of ${filteredBranches.length}`}
        </span>
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {showForm && (
        <Modal onClose={() => {
          setShowForm(false);
          setSelectedBranch(null);
        }}>
          <BranchForm
            branch={selectedBranch}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              setSelectedBranch(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
