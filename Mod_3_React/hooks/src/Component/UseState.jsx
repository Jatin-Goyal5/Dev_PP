import React, { useState } from "react";

const UseState = () => {
  const [count, setCount] = useState(1);
  const [color, setColor] = useState("blue");

//   useEffect(() => {
//       fetch.l
//       return () => {
//           cleanup
//       }
//   }, [dataType])

  return (
    <div>
      <button onClick={()=> setCount(count+1)  }>Posts</button>
      <button onClick={ () => setCount(count-1) }>Comments</button>
      <button onClick={ () => setCount(count-1) }></button>
    </div>
  );
};

export default UseState;