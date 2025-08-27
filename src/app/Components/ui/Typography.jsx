// Components/ui/Typography.jsx
"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

// Only keep the components you need
export const GradientText = ({ children, className }) => (
  <span className={cn("gradient-text", className)}>{children}</span>
);
