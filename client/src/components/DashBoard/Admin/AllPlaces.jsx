import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AllPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countryCounts, setCountryCounts] = useState({});

    useEffect(() => {
        fetch('https://gateway-pink-nine.vercel.app/places/all')
            .then(res => res.json())
            .then(data => {
                setPlaces(data);
                setLoading(false);
                
                // Count places by country
                const counts = data.reduce((acc, place) => {
                    acc[place.country] = (acc[place.country] || 0) + 1;
                    return acc;
                }, {});
                setCountryCounts(counts);
            });
    }, []);

    // Prepare data for Highcharts
    const chartData = {
        chart: {
            type: 'area',
        },
        title: {
            text: 'Number of Places by Country',
        },
        xAxis: {
            categories: Object.keys(countryCounts),
            title: {
                text: 'Country',
            },
        },
        yAxis: {
            title: {
                text: 'Number of Places',
            },
        },
        series: [
            {
                name: 'Places',
                data: Object.values(countryCounts),
            },
        ],
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Places</h1>
            <HighchartsReact highcharts={Highcharts} options={chartData} />

            <table className="table w-full mt-4">
                <thead>
                    <tr>
                        <th className="bg-slate-700 text-white">Image</th>
                        <th className="bg-slate-700 text-white">Title</th>
                        <th className="bg-slate-700 text-white">Country</th>
                        <th className="bg-slate-700 text-white">Location</th>
                        <th className="bg-slate-700 text-white">Price</th>
                        <th className="bg-slate-700 text-white">Average Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {places.map(place => (
                        <tr key={place._id}>
                            <td> <img className='w-10 rounded-lg' src={place.photos[0]} alt="" /> </td>
                            <td className="border p-2">{place.title}</td>
                            <td className="border p-2">{place.country}</td>
                            <td className="border p-2">{place.location}</td>
                            <td className="border p-2">${place.price}</td>
                            <td className="border p-2">{place.averageRating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllPlaces;
