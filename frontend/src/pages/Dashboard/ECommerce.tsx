// import React from 'react';
// import TableOne from '../../components/Tables/TableOne';
// import TableTwo from '../../components/Tables/TableTwo';


// const ECommerce: React.FC = () => {
//   React.useEffect(() => {
//     const authToken = localStorage.getItem("authToken");
//     if (!authToken) {
//       window.location.href = "/auth/signin";
//     }
//   }, []);

//   return (
//     <>
//       <div className="">
//         <div className="flex gap-20 ml-20 col-span-12 xl:col-span-6">
//           <TableOne /><TableTwo />
//         </div>
//         {/* <ChatCard /> */}
//       </div>
//     </>
//   );
// };
// export default ECommerce;
import React, { useEffect, useState } from 'react';
import TableOne from '../../components/Tables/TableOne';
import TableTwo from '../../components/Tables/TableTwo';

const ECommerce: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth/signin";
    }
    setUserName(localStorage.getItem('userName'));
    // Retrieve user name from localStorage
    // const storedUserName = localStorage.getItem("userName");
    // if (storedUserName) {
    //   setUserName(storedUserName);
    // }
  }, []);

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center">
          <div className="flex gap-20 ml-20 col-span-12 xl:col-span-6">
            <TableOne />
            <TableTwo />
          </div>

          {/* Display the user's name in the top-right corner */}
          <div className="mr-10 font-medium text-black dark:text-white">
          Welcome{userName ? userName : 'Guest'}!
          </div>
        </div>
      </div>
    </>
  );
};

export default ECommerce;
