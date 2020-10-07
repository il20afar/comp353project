import * as React from "react";

// [HELPER COMPONENTS] -> Better code styling
const D = React.forwardRef((props, ref) => {
  const { cn, ...rest } = props;
  return <div ref={ref} className={cn} {...rest} />;
});

export { D };
