import { ReactNode, useRef } from "react";
import { ArrowUp } from "lucide-react";
interface ContentProps {
  children: ReactNode;
  showScrollToTopButton: boolean;
}
const Content: React.FC<ContentProps> = ({
  children,
  showScrollToTopButton,
}) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const handleScrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className="dashboard-content p-8" ref={mainRef}>
        {children}
      </div>
      {showScrollToTopButton && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-10 right-10 bg-[#10172a] text-white p-2 rounded"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
};

export default Content;
