import * as XLSX from 'xlsx';
import { branchService } from './branchService';

export const excelService = {
  exportToExcel: async (branches) => {
    // Define headers
    const headers = [
      'Name',
      'Address',
      'Phone',
      'Email',
      'Manager',
      'Status'
    ];

    // Format data with headers
    const data = [
      headers,
      ...branches.map(branch => [
        branch.name,
        branch.address,
        branch.phone,
        branch.email,
        branch.manager,
        branch.status
      ])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Branches");
    XLSX.writeFile(workbook, "branches.xlsx");
  },

  importFromExcel: async (file) => {
    return new Promise((resolve, reject) => {
      // Validate file input
      if (!file || !(file instanceof File)) {
        reject(new Error('Invalid file input'));
        return;
      }

      // Validate file type
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
      ];
      if (!allowedTypes.includes(file.type)) {
        reject(new Error('Invalid file type. Please upload an Excel file (.xlsx or .xls)'));
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // Use try-catch for XLSX operations as they might fail
          let workbook;
          try {
            workbook = XLSX.read(e.target.result, { type: 'binary' });
          } catch (error) {
            throw new Error('Failed to read Excel file. Please ensure it\'s not corrupted.');
          }

          if (!workbook.SheetNames.length) {
            throw new Error('Excel file contains no sheets');
          }

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet, { 
            header: 1,
            defval: '', // Use empty string for empty cells
            blankrows: false // Skip empty rows
          });
          
          // Validate data structure
          if (!data || data.length < 2) {
            throw new Error('Invalid file format or empty file');
          }

          // Validate and normalize headers
          const headers = data[0].map(header => 
            header ? header.toString().trim().toLowerCase() : ''
          );
          
          const requiredHeaders = ['name', 'address'];
          const missingHeaders = requiredHeaders.filter(
            required => !headers.includes(required.toLowerCase())
          );

          if (missingHeaders.length > 0) {
            throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
          }

          const rows = data.slice(1);
          const formattedData = rows.map((row, rowIndex) => {
            const obj = {};
            headers.forEach((header, index) => {
              if (header && row[index] !== undefined) {
                obj[header] = row[index].toString().trim();
              }
            });

            // Validate required fields
            const missingFields = requiredHeaders.filter(field => !obj[field]);
            if (missingFields.length > 0) {
              throw new Error(
                `Row ${rowIndex + 2}: Missing required fields: ${missingFields.join(', ')}`
              );
            }

            return obj;
          });

          const importedData = await branchService.bulkImport(formattedData);
          resolve(importedData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  }
}; 