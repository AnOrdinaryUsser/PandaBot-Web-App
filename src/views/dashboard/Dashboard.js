import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate();

  return (
    <>
    <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard
