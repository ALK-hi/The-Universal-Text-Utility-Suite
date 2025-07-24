"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToolContainer } from "@/components/tool-container";
import { Braces, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import formatXML from "xml-formatter";

type FormatType = "json" | "xml";

export function JsonXmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [formatType, setFormatType] = useState<FormatType>("json");
  const { toast } = useToast();

  const handleFormat = (minify = false) => {
    try {
      let result = "";
      if (formatType === "json") {
        const parsed = JSON.parse(input);
        result = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
      } else { // xml
        if (minify) {
          result = input.replace(/>\s*</g, '><').trim();
        } else {
          result = formatXML(input, {
            indentation: '  ',
            collapseContent: true,
          });
        }
      }
      setOutput(result);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Formatting Failed",
        description: `Invalid ${formatType.toUpperCase()} data. ${error.message}`,
      });
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied to clipboard!",
      description: "The formatted text has been copied.",
    });
  };

  return (
    <ToolContainer
      title="JSON & XML Formatter"
      description="Beautify or minify JSON and XML data with ease."
      icon={Braces}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Label>Data Type:</Label>
          <RadioGroup defaultValue="json" onValueChange={(value: FormatType) => setFormatType(value)} className="flex">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="json" id="json-radio" />
              <Label htmlFor="json-radio">JSON</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="xml" id="xml-radio" />
              <Label htmlFor="xml-radio">XML</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="input-text">Input</Label>
            <Textarea
              id="input-text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste your ${formatType.toUpperCase()} here...`}
              className="min-h-[300px] text-base font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="output-text">Output</Label>
            <div className="relative">
              <Textarea
                id="output-text"
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="min-h-[300px] text-base font-mono"
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
          <Button onClick={() => handleFormat(false)}>Beautify / Format</Button>
          <Button onClick={() => handleFormat(true)} variant="secondary">Minify / Compact</Button>
        </div>
      </div>
    </ToolContainer>
  );
}
