import { create } from "zustand";
import { InvoiceStore } from "@/types/invoice";
import axios from "axios";

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoices: [],
  loading: false,
  error: null,

  fetchInvoices: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/invoices");
      set({ invoices: response.data.invoices, loading: false });
    } catch {
      set({ error: "Gagal mengambil data", loading: false });
    }
  },

  // addInvoice: async (invoice: Invoice) => {
  //   set({ loading: true });
  //   try {
  //     const response = await axios.post("/api/invoices", {
  //       invoice,
  //       completed: false,
  //     });
  //     set((state) => ({
  //       invoices: [...state.invoices, response.data],
  //       loading: false,
  //     }));
  //   } catch {
  //     set({ error: "Gagal menambahkan data", loading: false });
  //   }
  // },
}));
