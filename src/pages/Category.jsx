import React from 'react'
import { useParams } from 'react-router-dom'

const Category = () => {

    let { id } = useParams()
    console.log(id)

    return (
        <div>Category {id}</div>
    )
}

export default Category