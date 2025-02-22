export interface Invoice {
  invoice: string;
  paymentStatus: "Paid" | "Pending" | "Unpaid";
  totalAmount: number;
  paymentMethod: "Credit Card" | "PayPal" | "Bank Transfer";
}

export interface InvoiceStore {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
  fetchInvoices: () => Promise<void>;
}
