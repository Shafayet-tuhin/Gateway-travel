import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdminRoute({children}) {

    const {role} = useSelector((state) => state.user);
    const navigate = useNavigate();

    console.log(role)

    if ( role === 'GUEST'){
        Swal.fire({
            icon: 'error',
            title: 'You are not authorized to view this page',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        navigate('/login');
        return null;
    }

    return children;
   
}
