import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import "./upload-page.scss";
import Container from "../../components/container";
import Input from "../../components/input-field";
import LoadingSpinner from "../../components/loading-spinner";
import { createVideo } from "../../../common/api/video";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { notificationActions } from "../../store/slices/notification-slice";
import constants from "../../../common/constants";

const validationSchema = yup.object().shape({
	caption: yup
		.string()
		.required("Required")
		.max(
			constants.captionMaxLen,
			`At most ${constants.captionMaxLen} characters`
		),
	music: yup
		.string()
		.max(constants.musicMaxLen, `At most ${constants.musicMaxLen} characters`),
	tags: yup
		.string()
		.required("Required")
		.max(constants.tagsMaxLen, `At most ${constants.tagsMaxLen} characters`)
});

export default function UploadPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [videoFile, setVideoFile] = useState<File>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { username, token } = useAppSelector(state => state.auth);
	const videoURL = useMemo(
		() => (videoFile ? URL.createObjectURL(videoFile) : undefined),
		[videoFile]
	);

	const formik = useFormik({
		initialValues: {
			caption: "",
			music: "",
			tags: ""
		},
		validationSchema,
		onSubmit: async values => {
			setIsLoading(true);
			try {
				if (!videoFile || videoFile.type !== "video/mp4")
					throw new Error("Invalid video.");
				if (videoFile.size > constants.videoSizeLimit)
					throw new Error("File too large.");

				const formData = new FormData();
				formData.append("caption", values.caption);
				formData.append("tags", values.tags);
				formData.append("music", values.music);
				formData.append("username", username!);
				formData.append("token", token!);
				// keep the file last or the server does not get the correct data
				formData.append("video", videoFile);

				const res = await createVideo(formData);
				setIsLoading(false);
				navigate("/video/" + res.data.videoId);
			} catch (err: any) {
				setIsLoading(false);
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
			}
		}
	});

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
							{videoFile?.type === "video/mp4" ? (
								<video src={videoURL} autoPlay muted>
									Your browser does not support videos.
								</video>
							) : (
								<>
									<i className="fas fa-video" />
									<h4>Select video to upload</h4>
									<p>
										<span>MP4 format</span>
										<span>9 / 16 aspect ratio (preferred)</span>
										<span>
											Less than {constants.videoSizeLimit / 1048576} MB
										</span>
									</p>
								</>
							)}
							<input
								type="file"
								accept="video/mp4"
								id="video"
								onChange={e => setVideoFile(e.target.files?.[0])}
							/>
						</div>
					</label>
					<form className="description-portion" onSubmit={formik.handleSubmit}>
						<div className="form-group">
							<label htmlFor="caption">Caption</label>
							<Input
								id="caption"
								className="input"
								name="caption"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.caption && formik.errors.caption}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="tags">Tags</label>
							<Input
								id="tags"
								className="input"
								name="tags"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.tags && formik.errors.tags}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="music">Music</label>
							<Input
								id="music"
								className="input"
								name="music"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.music && formik.errors.music}
							/>
						</div>
						<button
							type="submit"
							className="primary-button"
							disabled={
								!formik.dirty || !formik.isValid || !videoFile || isLoading
							}
						>
							{isLoading ? (
								<LoadingSpinner className="upload-spinner" />
							) : (
								"Post"
							)}
						</button>
					</form>
				</div>
			</div>
		</Container>
	);
}