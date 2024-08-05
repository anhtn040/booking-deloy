'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('user');
        router.push('/login');
        return
    }, []);

    return null;
};

export default Logout;
