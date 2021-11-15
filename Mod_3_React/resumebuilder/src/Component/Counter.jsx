import { connect } from 'react-redux';
import React ,{useState}from 'react'

const Counter = (props) => {
    console.log("inside counter comp");
    // const [count, setCount] = useState(5);
    return (
      <div>
        <h1>Counter</h1>
        <p> {props.count} </p>
  
        <button onClick={() => { props.increment(); }}>Increment</button>
        <button onClick={() => { props.decrement(); }}>Decrement</button>
      </div>
    );
}

const mapStateToProps = (store)=>{

    return{
      count:store.count,  
    };

}

const mapDispatchToProps =(Dispatch)=>{
    return {
        increment:()=>{
            Dispatch({type:"INCREMENT"});
        },
        decrement:()=>{
            Dispatch({type:"DECREMENT"});
        }
    };

}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);
