import { useState, FC } from "react";
import "./switchTabs.scss";

interface SwitchTabsProps {
    data: string[];
    ontabChange: (tab: string) => void;
}

const SwitchTabs: FC<SwitchTabsProps> = ({ data, ontabChange }) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [left, setLeft] = useState<number>(0)

    const activeTab = (tab: string, index: number) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);

        ontabChange(tab)
    }

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span key={index}
                        className={`tabItem ${selectedTab === index ? "active" : ""}`}
                        onClick={() => activeTab(tab, index)}>{tab}</span>
                ))}
                <span className="movingBg" style={{left}}></span>
            </div>
        </div>
    )
}

export default SwitchTabs
