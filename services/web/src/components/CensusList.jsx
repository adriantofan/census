import React from 'react';
import CensusItem from './CensusItem';

const CensusList = (props) => {
  return (
    <table className="table table-striped">
        <thead> 
          <tr>
            <th> {props.field} </th>
            <th> Count </th>
            <th> Average Age </th>
          </tr>
        </thead>
        <tbody> 
          {
            props.census.map((item) => {
              return (
                <CensusItem key={item.value} item={item}/>
              )
            })
          }
        </tbody>
    </table> 
  )
}
export default CensusList;
