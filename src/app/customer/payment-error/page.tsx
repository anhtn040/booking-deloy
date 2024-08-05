'use client';
import React from 'react';
const PaymentError = () => {

  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', backgroundColor: '#ffebee' }}>
            <h1 style={{ color: '#d32f2f' }}>Thanh toán không thành công!</h1>
            <p style={{ color: '#b71c1c' }}>Rất tiếc, đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.</p>
        </div>

    </>
  );
}

export default PaymentError;

