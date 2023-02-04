// import React from "react";
// import useNFTdata from "./hooks/useApplicationData";

// const TestAppAPI = ({ nftId }) => {
//   const { nftData, error, loading } = useNFTdata(id);

//   if (loading) {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <p>Loading...</p>
//         </header>
//       </div>
//     );
//   }

//   const logo = nftData?.image_url;
//   const id = nftData?.id;

//   return (
//     <>
//       <h1>NFT Data</h1>
//       <p>ID: {nftData.id}</p>
//       <p>Logo: {nftData.logo}</p>
//     </>
//   );
// };

// export default TestAppAPI;