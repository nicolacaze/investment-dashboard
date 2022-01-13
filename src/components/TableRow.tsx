import React from "react";

const TableRow = ({ share }: { share: Share }) => {
  return (
    <tr className="h-8 border-b border-dark-gray">
      <td className="w-2/12">{share.name}</td>
      <td className="w-2/12">{share.ticker}</td>
      <td className="w-2/12">{share.industry}</td>
      <td className="w-2/12">{share.numberOfYears}</td>
      <td className="w-2/12">{share.price}</td>
      <td className="w-2/12">{share.dividendYield}</td>
    </tr>
  );
};

export default TableRow;
