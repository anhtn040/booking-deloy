"use client";
import { createOrder } from "@/app/api/customer";
import React, { useEffect } from "react";

const PaymentSuccess = () => {
  const handleCreateOrder = async () => {
    let body = localStorage.getItem("dataCreateOrder");
    if (body) body = JSON.parse(body);
    if (!body) return;
    const res = await createOrder(body);
    if (!res?.success) {
      alert(res?.message || "Đã xảy ra lỗi");
      return;
    }
    alert(res?.message || "Đặt hàng thành công");
    localStorage.removeItem('dataCreateOrder')
  };

  useEffect(() => {
    handleCreateOrder()
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "#e0f7fa",
      }}
    >
      <h1 style={{ color: "#00796b" }}>Thanh toán thành công!</h1>
      <p style={{ color: "#004d40" }}>
        Cảm ơn bạn đã thanh toán. Chúng tôi đã nhận được tiền thanh toán của
        bạn.
      </p>
    </div>
  );
};

export default PaymentSuccess;
