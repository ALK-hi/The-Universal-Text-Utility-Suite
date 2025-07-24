"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToolContainer } from "@/components/tool-container";
import { Quote, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export function TypographyStandardizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const toSmartQuotes = () => {
    let result = input;
    result = result
      .replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018") // opening singles
      .replace(/'/g, "\u2019") // closing singles & apostrophes
      .replace(/(^|[-\u2014\s(\["])_"/g, "$1\u201c") // opening doubles
      .replace(/"/g, "\u201d"); // closing doubles
    setOutput(result);
  };

  const toStraightQuotes = () => {
    let result = input;
    result = result
      .replace(/[\u2018\u2019]/g, "'") // single quotes and apostrophes
      .replace(/[\u201c\u201d]/g, '"'); // double quotes
    setOutput(result);
  };
  
  const standardizeDashes = () => {
      let result = input;
      // A common convention: three hyphens for em-dash, two for en-dash.
      // Or, more simply, just handle the most common cases.
      // Let's go with a simple and safe replacement: -- becomes em-dash.
      // And a single hyphen between spaces becomes an en-dash.
      // This is a bit ambiguous, so let's stick to a very direct approach.
      result = result
        .replace(/--/g, "\u2014") // em dash
        .replace(/-/g, "\u2013"); // en dash (could be configured for different behavior)
      setOutput(result);
  }

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied to clipboard!",
      description: "The standardized text has been copied.",
    });
  };

  return (
    <ToolContainer
      title="Typography Standardizer"
      description="Convert between smart (curly) and straight quotes, and standardize dashes."
      icon={Quote}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="input-text">Input</Label>
            <Textarea
              id="input-text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`"It's a beautiful day," she said -- a truly wonderful day.`}
              className="min-h-[250px] text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="output-text">Output</Label>
            <div className="relative">
              <Textarea
                id="output-text"
                value={output}
                readOnly
                placeholder="Professionally formatted text will appear here."
                className="min-h-[250px] text-base"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={copyToClipboard}
                disabled={!output}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={toSmartQuotes}>Convert to Smart Quotes</Button>
          <Button onClick={toStraightQuotes}>Convert to Straight Quotes</Button>
          <Button onClick={standardizeDashes}>Standardize Dashes</Button>
        </div>
      </div>
    </ToolContainer>
  );
}
