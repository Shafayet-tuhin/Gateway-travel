import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PrivateRoute({ children }) {
  const { email } = useSelector((state) => state.user);
 
  const navigate = useNavigate();

  const go = () => {
    navigate('/login');
  }

  if (!email) {
    // Show alert and redirect to login
    Swal.fire({
      icon: 'error',
      title: 'Please login first',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    go();

    // Move this outside to prevent redirect issues
    return null; // Prevent rendering the children if user is not authenticated
  }

  return children;
}
