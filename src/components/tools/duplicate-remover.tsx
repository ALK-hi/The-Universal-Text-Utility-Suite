"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToolContainer } from "@/components/tool-container";
import { CopyX, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export function DuplicateRemover() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const handleRemove = () => {
    const lines = input.split("\n");
    const uniqueLines = [...new Set(lines)];
    const result = uniqueLines.join("\n");
    setOutput(result);
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied to clipboard!",
      description: "The text with unique lines has been copied.",
    });
  };

  return (
    <ToolContainer
      title="Duplicate Line Remover"
      description="Efficiently remove identical lines from lists or text blocks."
      icon={CopyX}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="input-text">Input</Label>
                <Textarea
                id="input-text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your list or text here..."
                className="min-h-[200px] text-base"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="output-text">Output</Label>
                <div className="relative">
                <Textarea
                    id="output-text"
                    value={output}
                    readOnly
                    placeholder="Unique lines will appear here..."
                    className="min-h-[200px] text-base"
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
        <Button onClick={handleRemove}>Remove Duplicate Lines</Button>
      </div>
    </ToolContainer>
  );
}
