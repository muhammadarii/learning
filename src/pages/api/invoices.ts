// pages/api/invoices.ts
import { NextResponse } from "next/server";

export const runtime = "edge";

const data = {
  invoices: [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: 250.0,
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: 150.0,
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: 350.0,
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: 450.0,
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: 550.0,
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: 200.0,
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: 300.0,
      paymentMethod: "Credit Card",
    },
  ],
};

export default function handler(req: Request) {
  if (req.method === "GET") {
    return NextResponse.json(data);
  }

  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
