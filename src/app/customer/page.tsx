'use client';
import Link from 'next/link';
import { useState } from 'react';
import Marousel from './marousel';
import { UserProvider } from '../context/userContext';
import OpenNotifi from '@/components/notify/openNotify';
const Customer = () => {
    console.log('customer');
    return (
        <div>
            <UserProvider>
                <Marousel />
                <OpenNotifi />
            </UserProvider>
        </div>
    );
};
export default Customer;
