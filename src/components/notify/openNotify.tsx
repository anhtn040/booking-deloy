'use client';
import { UserContext } from '@/app/context/userContext';
import * as React from 'react';
import { useContext } from 'react';
import Notifi from './notify';


export default function OpenNotifi() {
  const { notifi } = useContext(UserContext);
  console.log(notifi);
  return <>{notifi?.message && <Notifi notifi={notifi} />}</>;
}