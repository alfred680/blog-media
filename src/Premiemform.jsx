import React, { useState } from "react";

function PremiumForm() {
  const [payment, setPayment] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Premium</h2>

      <form>
  
        <label className="block font-semibold mb-1">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter Name"
        />

        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter email"
        />

        
        <label className="block font-semibold mb-1">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter password"
        />

        
        <label className="block font-semibold mb-1">Select Plan</label>
        <select className="w-full p-2 border rounded mb-4" required>
          <option value="">Choose a plan</option>
          <option value="basic">Standard</option>
          <option value="silver">Student</option>
          <option value="gold">Gold</option>
          <option value="premium">Platinum</option>
        </select>

        <label className="block font-semibold mb-1">Payment Method</label>

        <div className="mb-4">
          <label className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              name="payment"
              value="credit_card"
              onChange={(e) => setPayment("credit_card")}
            />
            Credit Card
          </label>

          <label className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              name="payment"
              value="debit_card"
              onChange={(e) => setPayment("debit_card")}
            />
            Debit Card
          </label>

          <label className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              name="payment"
              value="upi"
              onChange={(e) => setPayment(e.target.value)}
            />
            UPI
          </label>
        </div>

        
        {(payment === "credit_card" || payment === "debit_card") && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">Account Number</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Enter Account Number"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PremiumForm;
