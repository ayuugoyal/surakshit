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
import { ScrollArea } from "@/components/ui/scroll-area";

const reasonss = {
  "Illegal Content":
    "If a website hosts or promotes illegal activities, such as child exploitation, drug trafficking, or other criminal behavior, it should be reported.",
  "Malware or Phishing":
    "Websites that distribute malware, viruses, or engage in phishing attempts to steal personal information should be reported to prevent harm to users.",
  "Hate Speech or Harassment":
    "Websites that promote hate speech, discrimination, or harassment based on racerace, gender, religion, or other factors can be reported to address harmful content.",
  "Copyright Infringement":
    "If a website is using someone else's intellectual property without permission, such as copyrighted text, images, or software, it can be reported for copyright infringement.",
  "Fraud or Scams":
    "Websites engaged in fraudulent activities, scams, or deceptive practices that can lead to financial harm should be reported to protect potential victims.",
  "Privacy Violations":
    "Websites that violate privacy laws or engage in the unauthorized collection and use of personal information may be reported to protect users' privacy.",
  "Misinformation or Fake News":
    "Reporting websites that spread false information or engage in disinformation campaigns can help combat the spread of misleading content.",
  "Violations of Terms of Service":
    "If a website is violating its own terms of service or community guidelines, users may choose to report it to the platform for corrective action.",
  "Unsafe or Insecure Practices":
    "Websites that lack proper security measures, potentially exposing users to cybersecurity threats, may be reported to prevent data breaches or unauthorized access.",
  "Violation of Local Laws":
    "Websites that operate in violation of local laws and regulations can be reported to relevant authorities for investigation and potential legal action.",
};

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
        <DropdownMenuContent className="w-full">
          <ScrollArea className="h-96 rounded-md border">
            <DropdownMenuLabel>Select Reason</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={reportReason}
              onValueChange={setReportReason}
            >
              {Object.entries(reasonss).map(([reason, description], index) => (
                <DropdownMenuRadioItem key={index} value={reason}>
                  <div className="flex flex-col gap-2">
                    {reason}
                    <p className="text-sm w-72 sm:w-full text-gray-500">
                      {description}
                    </p>
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </ScrollArea>
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
