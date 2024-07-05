import { ForwardedRef, forwardRef } from "react";

interface ComponentToPrintProps {
    // กำหนด props ที่นี่ (ถ้ามี)
  }

const ComponentToPrint = forwardRef<HTMLDivElement, ComponentToPrintProps>((props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>My cool content here!</div>
    );
  });

  ComponentToPrint.displayName = 'ComponentToPrint';

  export default ComponentToPrint