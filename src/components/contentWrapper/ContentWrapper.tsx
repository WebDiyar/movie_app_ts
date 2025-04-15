import { ReactNode } from "react";
import "./contentWrapper.scss";

interface ContentWrapperProps {
  children: ReactNode;
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
