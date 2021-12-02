import "./upload-page.scss";
import Container from "../../components/container";
import Input from "../../components/input-field";

export default function UploadPage() {
	return (
		<Container className="upload-page-container">
			<div className="card">
				<header>
					<h1>Upload video</h1>
					<h4>Post a video to your account</h4>
				</header>
				<div className="card-body">
					<label htmlFor="video">
						<div className="video-portion">
							<i className="fas fa-video" />
							<h4>Select video to upload</h4>
							<input type="file" accept="video/mp4" id="video" />
							<p>
								<span>MP4 format</span>
								<span>9 / 16 aspect ratio (preferred)</span>
								<span>Less than 20 MB</span>
							</p>
						</div>
					</label>
					<form className="description-portion">
						<div className="form-group">
							<label htmlFor="caption">Caption</label>
							<Input id="caption" className="input" />
						</div>
						<div className="form-group">
							<label htmlFor="tags">Tags</label>
							<Input id="tags" className="input" />
						</div>
						<div className="form-group">
							<label htmlFor="music">Music</label>
							<Input id="music" className="input" />
						</div>
						<button type="submit" className="primary-button" disabled>
							Post
						</button>
					</form>
				</div>
			</div>
		</Container>
	);
}
