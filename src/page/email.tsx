// // src/App.tsx

// import React, { useState } from "react";
// import { Fab } from "@mui/material";
// import { Edit as EditIcon } from "@mui/icons-material";
// import ComposeEmail from "../components/common/ComposeEmail";

// const EmailSend: React.FC = () => {
//   const [openCompose, setOpenCompose] = useState(false);

//   const handleOpenCompose = () => {
//     setOpenCompose(true);
//   };

//   const handleCloseCompose = () => {
//     setOpenCompose(false);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-indigo-950 mb-4">Email</h1>

//       <div>
//         {/* Floating Action Button to open Compose Email */}
//         <Fab
//           color="primary"
//           aria-label="compose"
//           onClick={handleOpenCompose}
//           sx={{ position: "fixed", bottom: 16, right: 16 }}
//         >
//           <EditIcon />
//         </Fab>

//         {/* Compose Email Dialog */}
//         {/* <ComposeEmail open={openCompose} handleClose={handleCloseCompose} /> */}
//       </div>
//     </div>
//   );
// };

// export default EmailSend;
