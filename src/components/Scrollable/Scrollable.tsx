import React from "react";
import { useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import useResizeObserver from "@react-hook/resize-observer";
import "./_styles.scss";
import { classNameBuilder } from "@utils";

interface ScrollableProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Scrollable({ className, children }: ScrollableProps) {
  const scrollableRef = useRef<Scrollbars>(null);
  const [content, setContent] = useState<HTMLDivElement | null>(null);

  useResizeObserver(content, () => {
    const scrollable: Scrollbars | null = scrollableRef.current;

    if (!scrollable) return;

    const scrollTop = scrollable.getScrollTop();
    const scrollHeight = scrollable.getScrollHeight();
    const clientHeight = scrollable.getClientHeight();
    const verticalTracker = (scrollable as any).trackVertical as HTMLDivElement;

    if (scrollHeight === clientHeight) verticalTracker.style.display = "none";
    else {
      verticalTracker.style.display = "block";
      scrollable.scrollToBottom();
      scrollable.scrollTop(scrollTop);
    }
  });

  return (
    <Scrollbars
      className={classNameBuilder("scrollable", className ?? "")}
      ref={scrollableRef}
    >
      <div className="scrollable-content" ref={(c) => setContent(c)}>
        {children}
      </div>
    </Scrollbars>
  );
}
