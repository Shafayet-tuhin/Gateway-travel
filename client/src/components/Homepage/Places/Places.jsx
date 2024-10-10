import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import SIinglePlace from './SIinglePlace';
import usePlace from '../../../Hooks/usePlace';
import { MdClear } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import {
    setCurrentPage,
    setTotalPages,
    setSortBy,
    setFilterByCountry,
    setSearchTitle,
} from '../../../Redux/placeSlice';

const Places = () => {
    const { currentPage, totalPages, sortBy, filterByCountry, searchTitle } = useSelector((state) => state.places);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");

    const [Place, loading, refetch] = usePlace();
    console.log(Place);

    // Move this logic to useEffect to avoid dispatching during render
    useEffect(() => {
        if (!loading && Place) {
            dispatch(setTotalPages(Place.totalPages));
            dispatch(setCurrentPage(Place.currentPage));
        }
    }, [loading, Place, dispatch]);

    console.log(currentPage, totalPages, sortBy, filterByCountry, searchTitle);

    const handleSortBy = (e) => {
        dispatch(setSortBy(e.target.value));
        refetch();
    }

    const handleCountry = (e) => {
        dispatch(setFilterByCountry(e.target.value));
        refetch();
    }

    const handleSearch = (e) => {
        dispatch(setSearchTitle(searchTerm));
        refetch();
    }

    const handlereset = () => {
        setSearchTerm("");
        dispatch(setSearchTitle(""));
        refetch();
    }

    return (
        <div className='mt-20 mb-20'>
            <h1 className='font-abc2 text-5xl mb-20 text-center'>Discover your next Gateway</h1>

            {/* Filter Section */}
            <div className='flex flex-col md:flex-row items-center justify-between gap-6 font-abc2 mb-16'>
                {/* Price Filter */}
                <div className='flex items-center'>
                    <label htmlFor="price" className='font-medium mr-2'>Sort by Price:</label>
                    <select
                        id="price"
                        className="w-full md:w-48 font-serif px-4 py-2 rounded-2xl border-2 text-center"
                        onChange={(e) => handleSortBy(e)}
                    >
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>

                {/* Country Filter */}
                <div className='flex items-center'>
                    <label htmlFor="country" className='font-medium mr-2'>Filter by Country:</label>
                    <select
                        id="country"
                        className="w-full md:w-48 font-serif px-4 py-2 text-center rounded-2xl border-2"
                        onChange={(e) => handleCountry(e)}
                    >
                        <option value="">All Countries</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="GREECE">Greece</option>
                        <option value="AUSTRALIA">Australia</option>
                        <option value="UAE">UAE</option>
                        <option value="THAILAND">Thailand</option>
                        <option value="FRANCE">France</option>
                        <option value="Switzerland">Switzerland</option>
                    </select>
                </div>

                {/* Search Option */}
                <div className='flex items-center gap-2'>
                    <input
                        type="text"
                        placeholder="Search By Location"
                        className="input input-bordered w-full md:w-64 font-serif px-4 py-2 border-2 rounded-2xl"
                        value={searchTerm} // Bind the input value to the state
                        onChange={(e) => {

                            if (e.target.value === "") {
                                handlereset();
                            }

                            setSearchTerm(e.target.value)
                        }} // Update the state as user types
                    />

                    <button onClick={() => handleSearch()} className='btn btn-circle'> <FaSearch /> </button>
                </div>
            </div>

            {/* Places List */}
            {
                loading ? (
                    <h1 className='text-center font-abc2 text-2xl'>
                        <span className="loading w-[20%] loading-bars "></span>
                    </h1>
                ) : Place.places.length === 0 ? (
                    <h1 className='text-center font-abc2 text-2xl'>No data found</h1>
                ) : <div className='grid lg:grid-cols-4 gap-4 px-4 lg:px-0'>
                    {Place.places.map((item, index) => (
                        <SIinglePlace key={index} item={item} />
                    ))}
                </div>

            }


            {/* Pagination */}
            <div className='flex justify-center mt-10'>

                {/* Page numbers */}
                <div className='flex items-center'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => dispatch(setCurrentPage(index + 1))}
                            className={`btn ${currentPage === index + 1 ? 'btn btn-info btn-circle text-white font-abc2' : 'font-abc2 btn btn-circle'} mx-1`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default Places;
