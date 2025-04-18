"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UnifiedQuote } from "@/lib/api/quotes";
import { useState } from "react";
import { toast } from "sonner";

interface QuoteCardProps {
  quote: UnifiedQuote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const [copying, setCopying] = useState(false);

  // Function to determine quote length category
  const getLengthCategory = (length: number) => {
    if (length <= 75) return "Short";
    if (length <= 150) return "Medium";
    return "Long";
  };

  // Function to copy quote to clipboard
  const copyToClipboard = async () => {
    setCopying(true);
    try {
      const textToCopy = `"${quote.quote}" - ${quote.author}`;
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Quote copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
      console.error("Failed to copy:", error);
    } finally {
      setCopying(false);
    }
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
        onClick={copyToClipboard}
        disabled={copying}
        title="Copy to clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          {copying ? (
            <>
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </>
          ) : (
            <>
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </>
          )}
        </svg>
      </Button>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{quote.author}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground italic">"{quote.quote}"</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground">{quote.source}</span>
        <span className="text-sm text-muted-foreground">
          {getLengthCategory(quote.length)} ({quote.length} chars)
        </span>
      </CardFooter>
    </Card>
  );
}

export function CardSkeleton() {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow relative">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Loading...</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground italic"> </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground"> </span>
        <span className="text-sm text-muted-foreground"> </span>
      </CardFooter>
    </Card>
  );
}
