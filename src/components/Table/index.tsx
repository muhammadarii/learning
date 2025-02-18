"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-style";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Invoice } from "@/types";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const TableStyle = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchInvoice, setSearchInvoice] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get("search") || "";

  // Fetch invoices based on the search query
  const fetchInvoices = async (searchQuery: string = "") => {
    try {
      const response = await axios.get("/api/invoices", {
        params: { search: searchQuery },
      });
      setInvoices(response.data.invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    if (query) {
      setSearchInvoice(query); // Set the search term from the URL
      fetchInvoices(query); // Fetch invoices based on the URL search term
    } else {
      fetchInvoices(); // Fetch all invoices if no search term is present
    }
  }, [query]); // Re-run when the search query changes

  const handleSearch = () => {
    // Update the URL with the search query
    router.push(`?search=${searchInvoice}`);
  };

  return (
    <div className="p-10">
      <div className="flex flex-row gap-2 mb-4">
        <input
          type="text"
          className="px-2 border border-gray-300 rounded-md w-[300px]"
          placeholder="Search for invoice"
          value={searchInvoice}
          onChange={(e) => setSearchInvoice(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} variant="outline" className="p-2">
          Search
        </Button>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  ${invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No invoices found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {invoices.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                $
                {invoices
                  .reduce((sum, inv) => sum + inv.totalAmount, 0)
                  .toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
};

export default TableStyle;
