"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ToolContainerProps {
    title: string;
    description: string;
    icon: LucideIcon;
    children: React.ReactNode;
}

export function ToolContainer({ title, description, icon: Icon, children }: ToolContainerProps) {
    return (
        <Card className="w-full h-full border-0 shadow-none rounded-none md:border md:rounded-xl md:shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                    <Icon className="h-6 w-6 text-primary" />
                    <span>{title}</span>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}
