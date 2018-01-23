import React from 'react';

const CensusItem = (props) => {
  return (
    <tr>
      <td> {props.item.value} </td>
      <td> {props.item.count} </td>
      <td> {props.item.avg} </td>
    </tr> 
  )
}
export default CensusItem;
