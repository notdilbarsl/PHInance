import React from 'react';
import TableOne from '../../components/Tables/TableOne';
import TableTwo from '../../components/Tables/TableTwo';


const ECommerce: React.FC = () => {
  React.useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth/signin";
    }
  }, []);

  return (
    <>
      <div className="">
        <div className="flex gap-20 ml-20 col-span-12 xl:col-span-6">
          <TableOne /><TableTwo />
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};
export default ECommerce;
