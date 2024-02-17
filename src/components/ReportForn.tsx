"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Input } from "./ui/input";
import { useState } from "react";
import { report_url } from "@/actions/report";

const ReportForn = ({ userId }: { userId: string }) => {
  const [reportReason, setReportReason] = useState<string>("report reason...");
  const [urlReport, setUrlReport] = useState<string>("");
  const handleReport = async () => {
    try {
      console.log(userId, urlReport, reportReason);
      const addReportUrl = await report_url({
        user_id: userId,
        link: urlReport,
        reason: reportReason,
      });
      console.log(addReportUrl);
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        className="bg-white dark:bg-gray-950"
        placeholder="Paste Reporting Url..."
        type="text"
        onChange={(e) => setUrlReport(e.target.value)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{reportReason}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select Reason</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={reportReason}
            onValueChange={setReportReason}
          >
            <DropdownMenuRadioItem value="top">top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        className="hover:bg-[#FF0000]"
        type="submit"
        onClick={handleReport}
      >
        Report
      </Button>
    </div>
  );
};

export default ReportForn;
