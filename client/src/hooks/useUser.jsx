
import UseAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import UseAuth from './useAuth';
import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useUser = () => {
    const {user, loading} = UseAuth();
    const axiosSecure = useAxiosSecure();

    const {data: role = '', isLoading} = useQuery({
      queryKey: ['role', user?.email],
      enabled: !loading && !!user?.email,
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/users-role/${user?.email}`);
        console.log(data.role);
        return data.role;
      }
    })
    
    return [role, isLoading ];
}
export default useUser;