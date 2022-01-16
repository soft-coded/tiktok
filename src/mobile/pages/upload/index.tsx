import PageWithNavbar from "../../components/page-with-navbar";
import "./upload.scss";
import Input from "../../../common/components/input-field";
import constants from "../../../common/constants";

export default function Upload() {
	return (
		<PageWithNavbar containerClassName="upload-page">
			<header>Upload</header>
			<form className="content">
				<div className="video-container">
					<i className="fas fa-video" />
					<h4>Select video to upload</h4>
					<p>
						<span>MP4 format</span>
						<span>9 / 16 aspect ratio (preferred)</span>
						<span>
							Less than {Math.round(constants.videoSizeLimit / 1048576)} MB
						</span>
					</p>
				</div>
				<div className="info-container">
					<div className="form-group">
						<h5>
							<label htmlFor="caption">Caption</label>
							<span>
								Currently does not support @ mentions (and won't till I figure
								out how mentions work 🙂).
							</span>
						</h5>
						<Input isMobile />
					</div>
					<div className="form-group">
						<h5>
							<label htmlFor="caption">Tags</label>
							<span>
								Space separated list of words (# can be omitted). Used while
								searching for videos and (eventually) for recommendations.
								<br />
								Example: "#Tag1 Tag2"
							</span>
						</h5>
						<Input isMobile />
					</div>
					<div className="form-group">
						<h5>
							<label htmlFor="caption">Music</label>
							<span>
								TikTok (the real one) identifies music used in the video
								automatically, but no such feature exists here so you gotta type
								it manually 😊. Can also be left blank. <br /> Example: Rick
								Astley - Never gonna give you up
							</span>
						</h5>
						<Input isMobile />
					</div>
					<div className="buttons">
						<button type="button" className="cancel-button">
							Cancel
						</button>
						<button type="submit" className="primary-button">
							Post
						</button>
					</div>
				</div>
			</form>
		</PageWithNavbar>
	);
}
