import { useState } from "react";
import * as XLSX from "xlsx";
import Pagination from "../../components/common/Pagination";


const Dashboard: React.FC = () => {
  const [fileData, setFileData] = useState<string[][]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });

      setFileData(jsonData as string[][]); // Cast jsonData to string[][]
      setCurrentPage(1); // Reset to the first page on new upload
    };
    reader.readAsBinaryString(file);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const paginatedData = fileData.slice(startRow, endRow);
  const totalPages = Math.ceil(fileData.length / rowsPerPage);
 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-950 mb-4">Dashboard</h1>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">File Data:</h2>
        {fileData.length > 0 && (
          <>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  {fileData[0].map((header, index) => (
                    <th
                      key={index}
                      className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, rowIndex) => (
                  <tr key={startRow + rowIndex} className="even:bg-gray-50">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="py-2 px-4 border-b border-gray-300"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
  
            <Pagination
              page={currentPage}
              totalProducts={totalPages}
              handlePage={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
  
};

export default Dashboard;
