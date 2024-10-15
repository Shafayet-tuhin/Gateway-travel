import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; // Update to the new package
import Swal from 'sweetalert2';

const AllUsers = () => {
  const { id, role } = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState({ admin: 0, superAdmin: 0, guest: 0 });

  useEffect(() => {
    // Fetch all users
    fetch(`http://localhost:3000/user/${id}`) // Assuming this endpoint returns all users
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        calculateRoleRatio(data); // Calculate role ratio for the chart
      });
  }, []);

  // Calculate the ratio of different roles
  const calculateRoleRatio = (users) => {
    let admin = 0;
    let superAdmin = 0;
    let guest = 0;

    users.forEach(user => {
      if (user.role === 'ADMIN') admin++;
      if (user.role === 'SUPER_ADMIN') superAdmin++;
      if (user.role === 'GUEST') guest++;
    });

    setChartData({ admin, superAdmin, guest });
  };

  // Function to change role
  const handleChangeRole = (userId, newRole) => {
       if ( role !== 'SUPER_ADMIN') {
         
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "warning",
            title: "Please contact Super Admin to change role"
          });
        return
       }

    fetch(`http://localhost:3000/user/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
    })
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        if(data.message === 'Role changed successfully') {
          setUsers(data.result);
          calculateRoleRatio(data.result);

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Role changed successfully"
          });

        }
    })
       
  };

  // Highcharts configuration for role distribution
  const chartConfig = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'User Role Distribution',
    },
    series: [
      {
        name: 'Users',
        data: [
        { name: 'Super Admin', y: chartData.superAdmin },
          { name: 'Admin', y: chartData.admin },
          { name: 'Guest', y: chartData.guest },
        ],
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4 font-bold">All Users</h1>

      {/* Highcharts Area */}
      <div className="mb-8">
        <HighchartsReact highcharts={Highcharts} options={chartConfig} />
      </div>

      {/* Table to display users */}
      <table className="min-w-full shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm">
            <th className="py-3 px-6">Profile</th>
            <th className="py-3 px-6">Username</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Role</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b">
              <td className="py-3 px-6"><img src={user.profilePicture} className='w-12 rounded-3xl h-12' alt="" /></td>
              <td className="py-3 px-6">{user.username}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.role}</td>
              <td className="py-3 px-6">
                {/* Dropdown to change role */}
                <select
                  value={user.role}
                  onChange={(e) => handleChangeRole(user._id, e.target.value)}
                  className=" bg-slate-700 p-2 rounded-md"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="GUEST">Guest</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
