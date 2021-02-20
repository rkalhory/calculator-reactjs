import React from 'react'
import Button from "./Button";

function ButtonRow (propse){
    return propse.data.map(data=><Button handleClick={data.operator}>{data.name}</Button>)
}

export default ButtonRow