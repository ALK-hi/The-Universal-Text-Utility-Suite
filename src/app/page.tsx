"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CaseSensitive,
  Sigma,
  ArrowLeftRight,
  Eraser,
  CopyX,
  Diff,
  Code,
  type LucideIcon,
  Text,
  Braces,
  KeyRound,
  Shield,
  PanelLeft,
  Search,
  Quote,
  Table,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { CaseConverter } from "@/components/tools/case-converter";
import { Counter } from "@/components/tools/counter";
import { Reverser } from "@/components/tools/reverser";
import { WhitespaceRemover } from "@/components/tools/whitespace-remover";
import { DuplicateRemover } from "@/components/tools/duplicate-remover";
import { DiffTool } from "@/components/tools/diff-tool";
import { EncoderDecoder } from "@/components/tools/encoder-decoder";
import { JsonXmlFormatter } from "@/components/tools/json-xml-formatter";
import { UuidGenerator } from "@/components/tools/uuid-generator";
import { PasswordGenerator } from "@/components/tools/password-generator";
import { FindAndReplace } from "@/components/tools/find-and-replace";
import { TypographyStandardizer } from "@/components/tools/typography-standardizer";
import { CsvTool } from "@/components/tools/csv-tool";
import { useIsMobile } from "@/hooks/use-mobile";

type ToolId =
  | "case-converter"
  | "counter"
  | "reverser"
  | "whitespace-remover"
  | "duplicate-remover"
  | "diff-tool"
  | "encoder-decoder"
  | "json-xml-formatter"
  | "uuid-generator"
  | "password-generator"
  | "find-and-replace"
  | "typography-standardizer"
  | "csv-tool";

interface Tool {
  id: ToolId;
  name: string;
  description: string;
  icon: LucideIcon;
  component: React.ComponentType;
  meta: {
    title: string;
    description: string;
  };
}

const tools: Tool[] = [
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text to various cases.",
    icon: CaseSensitive,
    component: CaseConverter,
    meta: {
      title: "Online Case Converter Tool",
      description: "Easily convert text between uppercase, lowercase, title case, sentence case, camel case, and more with our free case converter tool. Perfect for developers, writers, and editors.",
    }
  },
  {
    id: "counter",
    name: "Word Counter",
    description: "Count words, characters, and lines.",
    icon: Sigma,
    component: Counter,
    meta: {
      title: "Word and Character Counter",
      description: "Free online tool to count words, characters, sentences, and lines in your text. Instant statistics for writers, students, and professionals.",
    }
  },
  {
    id: "reverser",
    name: "Text Reverser",
    description: "Reverse text, words, or letters.",
    icon: ArrowLeftRight,
    component: Reverser,
    meta: {
      title: "Text Reverser Tool",
      description: "Reverse text, flip words, and mirror letters with our simple online text reverser. Useful for data processing, creating fun text, and more.",
    }
  },
  {
    id: "whitespace-remover",
    name: "Whitespace Tools",
    description: "Remove, convert, and standardize whitespace.",
    icon: Eraser,
    component: WhitespaceRemover,
    meta: {
      title: "Whitespace and Line Break Remover",
      description: "Clean up your text by removing extra spaces, tabs, and line breaks. A handy tool for formatting text for web pages, documents, or code.",
    }
  },
  {
    id: "duplicate-remover",
    name: "Duplicate Line Remover",
    description: "Remove duplicate lines from text.",
    icon: CopyX,
    component: DuplicateRemover,
    meta: {
      title: "Duplicate Line Remover Online",
      description: "Quickly remove duplicate lines from any text or list. Just paste your text and get a clean, unique list in seconds. Free and easy to use.",
    }
  },
  {
      id: "find-and-replace",
      name: "Find and Replace",
      description: "Search and replace text.",
      icon: Search,
      component: FindAndReplace,
      meta: {
          title: "Online Find and Replace Tool",
          description: "Quickly find and replace words or patterns in your text. Supports case-sensitive, whole word, and regular expression searches.",
      },
  },
  {
    id: "diff-tool",
    name: "Text Diff Tool",
    description: "Compare two pieces of text.",
    icon: Diff,
    component: DiffTool,
    meta: {
      title: "Text Difference Checker (Diff Tool)",
      description: "Compare two text files or snippets to find the differences. Our free online diff tool highlights changes between two versions of your text.",
    }
  },
  {
    id: "csv-tool",
    name: "CSV Tools",
    description: "Manipulate and analyze CSV data.",
    icon: Table,
    component: CsvTool,
    meta: {
      title: "Online CSV Editor & Tools",
      description: "A free suite of online tools for CSV data: change delimiters, transpose rows and columns, manage quotes, and more. Perfect for data cleaning and preparation.",
    }
  },
  {
    id: "encoder-decoder",
    name: "Encoder/Decoder",
    description: "Encode/Decode Base64 and URLs.",
    icon: Code,
    component: EncoderDecoder,
    meta: {
      title: "Base64 & URL Encoder/Decoder",
      description: "Free online tool to encode and decode text using Base64 or URL encoding (percent-encoding). Simple and fast for web developers and programmers.",
    }
  },
  {
    id: "json-xml-formatter",
    name: "JSON/XML Formatter",
    description: "Format & beautify JSON or XML.",
    icon: Braces,
    component: JsonXmlFormatter,
    meta: {
      title: "JSON & XML Formatter/Minifier",
      description: "Beautify, format, or minify JSON and XML data with our easy-to-use online tool. Essential for developers and data analysts working with structured data.",
    }
  },
  {
      id: "typography-standardizer",
      name: "Typography Standardizer",
      description: "Fix quotes and dashes.",
      icon: Quote,
      component: TypographyStandardizer,
      meta: {
          title: "Typography Standardizer Tool",
          description: "Automatically convert plain quotes to smart (curly) quotes and standardize hyphens and dashes for professional-looking text.",
      },
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate unique identifiers.",
    icon: KeyRound,
    component: UuidGenerator,
    meta: {
      title: "UUID/GUID Generator",
      description: "Generate universally unique identifiers (UUIDs/GUIDs) for your software development needs. Quick, simple, and reliable.",
    }
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Create strong, random passwords.",
    icon: Shield,
    component: PasswordGenerator,
    meta: {
      title: "Strong Password Generator",
      description: "Generate secure, random passwords to protect your online accounts. Customize length and character types for maximum security.",
    }
  },
];

const isValidToolId = (id: any): id is ToolId => {
  return tools.some(tool => tool.id === id);
}

const getInitialToolId = (searchParams: URLSearchParams | null): ToolId => {
  const toolId = searchParams?.get("tool");
  if (toolId && isValidToolId(toolId)) {
    return toolId;
  }
  return "case-converter";
};

function HomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeToolId, setActiveToolId] = React.useState<ToolId>(() => getInitialToolId(searchParams));
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const toolId = searchParams?.get("tool");
    if (toolId && isValidToolId(toolId) && toolId !== activeToolId) {
      setActiveToolId(toolId);
    }
  }, [searchParams, activeToolId]);

  const handleToolSelect = (toolId: ToolId) => {
    setActiveToolId(toolId);
    const params = new URLSearchParams(window.location.search);
    params.set("tool", toolId);
    router.push(`?${params.toString()}`, { scroll: false });
    if(isMobile) {
        setMobileMenuOpen(false);
    }
  };
  
  const activeTool = React.useMemo(
    () => tools.find((tool) => tool.id === activeToolId),
    [activeToolId]
  );
  
  React.useEffect(() => {
    if (activeTool) {
      document.title = `${activeTool.meta.title} | OmniText`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", activeTool.meta.description);
      }
    }
  }, [activeTool]);

  const ActiveToolComponent = activeTool?.component;

  const sidebarContent = (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Text className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-semibold">OmniText</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {tools.map((tool) => (
            <SidebarMenuItem key={tool.id}>
              <SidebarMenuButton
                onClick={() => handleToolSelect(tool.id)}
                isActive={activeToolId === tool.id}
                tooltip={tool.name}
              >
                <tool.icon />
                <span>{tool.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        {isMobile ? (
             <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-3/4">
                    <Sidebar className="w-full h-full">
                        {sidebarContent}
                    </Sidebar>
                </SheetContent>
            </Sheet>
        ) : (
            <Sidebar>
                {sidebarContent}
            </Sidebar>
        )}
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="outline">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                   <SheetContent side="left" className="p-0 w-3/4">
                    <Sidebar className="w-full h-full">
                        {sidebarContent}
                    </Sidebar>
                </SheetContent>
              </Sheet>
          </header>
          <main className="p-4 sm:p-6 h-full flex-1">
            {ActiveToolComponent && <ActiveToolComponent />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function Home() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <HomePageContent />
        </React.Suspense>
    )
}
