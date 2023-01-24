import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from './Loader';
export default function MainHeader() {
    const [query ,setquery] = useState('');
    const [data , setdata] =useState({items: []});
    const [search , setsearch ] = useState('');
    const[locader, setLoader] =useState(true);
    const update = (e) => {
        e.preventDefault();
        setsearch(e.target.value);
    } 
    const getData = () => {
        
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&orderBy=newest`)
        .then( res => {
            setLoader(false)
            setdata(res.data);
        })}
    const Handle= (e) =>{
        e.preventDefault();
        setLoader(false)
        getData();
    }
   
   
  return (
    
    <div className="container mt-33">
        <div className="text-4xl font-bold text-center">Search For Books</div>
        <form action="" className='form-group flex justify-content-center mt-3' onSubmit={ (e) => Handle(e)}>
            <input type="text" className='form-control rounded-lg h-12 w-75' onChange={ (e) => update(e)} placeholder="Enter Book Name"  />
        <button type="submit" className='ml-2 bg-slate-700 hover:bg-slate-900 w-20 rounded-lg'><span className='fa fa-search text-cyan-400'></span></button>
            </form>
        <div className="row">
           
                {   
                    data.items.map( (book,index ) =>{
                        return(
                            <div className="col-md-4 mt-3">
                            <div className="card p-3" key={index}>
                                <img src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}   alt="" className='img-fluid img-thumbnail rounded' />
                                <h3 className='card-title font-bold text-center mt-2'> { book.volumeInfo.title }</h3>
                                <h3 className='font-bold'> Author: { book.volumeInfo.authors[1] }</h3>
                                <h4 className='card-body '> Date:  { book.volumeInfo.publishedDate} <span className='ml-3'><a className='btn btn-sm bg-cyan-300 hover:bg-cyan-600 float-right d-inline' href={`https://books.google.com.mm/books?id=${book.id}&q=${query}&dq=${query}&hl=en&sa=X&ved=2ahUKEwik_aaI17b6AhVfxHMBHdkMAhIQ6AF6BAgDEAE`}>info</a></span></h4>
                            </div>
                            </div>
                        )
                    })
                    
                }
            
        </div>
    </div>
  )
}
