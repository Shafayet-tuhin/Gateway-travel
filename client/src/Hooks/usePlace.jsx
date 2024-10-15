import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { useSelector } from 'react-redux';

const usePlace = () => {

    const { currentPage, totalPages, sortBy, filterByCountry, searchTitle } = useSelector((state) => state.places);

    const { data: Place = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['Place', currentPage, sortBy, filterByCountry, searchTitle], // Add dependencies here
        queryFn: async () => {
            const res = await fetch(`https://gateway-pink-nine.vercel.app/places?page=${currentPage}&limit=8&sortBy=${sortBy}&filterCountry=${filterByCountry}&searchTitle=${searchTitle}`);
            const data = await res.json();
            return data;
        },
    });


    return [Place, loading, refetch];
};

export default usePlace;
