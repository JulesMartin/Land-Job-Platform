import * as React from "react";

import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  React.ComponentRef<"label">,
  React.ComponentPropsWithoutRef<"label">
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    data-slot="label"
    className={cn(
      "text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium leading-none",
      className,
    )}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
