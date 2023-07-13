import React,{useEffect, useState} from 'react'
import Dashboard from './Dashboard';
import One from './one';
import Two from './two';
import Three from './three';
import Four from './four';

export default function Layout({pageName}) {

 
  return (
    <>
        {pageName === 'dashboard' && <Dashboard />}
        {pageName === 'one' && <One />}
        {pageName === 'two' && <Two />}
        {pageName === 'three' && <Three />}
        {pageName === 'four' && <Four />}
    </>
  )
}
