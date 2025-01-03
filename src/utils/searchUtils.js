export const filterBranches = (branches, searchTerm) => {
  if (!Array.isArray(branches)) {
    console.warn('branches is not an array:', branches);
    return [];
  }

  if (!searchTerm) return branches;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return branches.filter((branch) => {
    return (
      branch.name?.toLowerCase().includes(lowerSearchTerm) ||
      branch.address?.toLowerCase().includes(lowerSearchTerm) ||
      branch.email?.toLowerCase().includes(lowerSearchTerm) ||
      branch.manager?.toLowerCase().includes(lowerSearchTerm) ||
      branch.phone?.includes(searchTerm)
    );
  });
}; 