import ReactPlayer from "react-player/youtube";
import './videoPopup.scss'

interface Props {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    videoId: string | number | null | undefined;
    setVideoId: React.Dispatch<React.SetStateAction<string | number | null | undefined>>;
}

const VideoPopup = ({ show, setShow, videoId, setVideoId }: Props) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };

    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default VideoPopup;