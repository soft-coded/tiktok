import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import PageWithNavbar from "../../components/page-with-navbar";
import "./upload.scss";
import Input from "../../../common/components/input-field";
import constants from "../../../common/constants";
import { useAppDispatch, useAppSelector } from "../../../common/store";
import { createVideo } from "../../../common/api/video";
import { errorNotification } from "../../helpers/error-notification";
import { joinClasses } from "../../../common/utils";
import LoadingSpinner from "../../../common/components/loading-spinner";
import { notificationActions } from "../../../common/store/slices/notification-slice";

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

export default function Upload() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [videoFile, setVideoFile] = useState<File>();
	const [isLoading, setIsLoading] = useState(false);
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
		onSubmit: values => {
			errorNotification(
				async () => {
					setIsLoading(true);
					if (!videoFile || videoFile.type !== "video/mp4")
						throw new Error("Invalid video");
					if (videoFile.size > constants.videoSizeLimit)
						throw new Error("File too large");

					const formData = new FormData();
					formData.append("caption", values.caption);
					formData.append("tags", values.tags);
					formData.append("music", values.music);
					formData.append("username", username!);
					formData.append("token", token!);
					// keep the file last or the server does not get the correct data
					formData.append("video", videoFile);

					dispatch(
						notificationActions.showNotification({
							type: "success",
							message: "Uploading and compressing. This may take 2-5 minutes"
						})
					);
					const res = await createVideo(formData);
					navigate("/video/" + res.data.videoId);
				},
				dispatch,
				() => setIsLoading(false)
			);
		}
	});

	return (
		<PageWithNavbar containerClassName="upload-page">
			<header>Upload</header>
			<form className="content" onSubmit={formik.handleSubmit}>
				<label htmlFor="video">
					<div
						className={joinClasses(
							"video-container",
							videoFile?.type === "video/mp4" && "playing"
						)}
					>
						{videoFile?.type === "video/mp4" ? (
							<video src={videoURL} className="player" loop autoPlay muted />
						) : (
							<>
								<i className="fas fa-video" />
								<h4>Select video to upload</h4>
								<p>
									<span>MP4 format</span>
									<span>9 / 16 aspect ratio (preferred)</span>
									<span>
										Less than {Math.round(constants.videoSizeLimit / 1048576)}
										&nbsp;MB
									</span>
								</p>
							</>
						)}
						<input
							type="file"
							id="video"
							accept="video/mp4"
							onChange={e => setVideoFile(e.target.files?.[0])}
						/>
					</div>
				</label>
				<div className="info-container">
					<div className="form-group">
						<h5>
							<label htmlFor="caption">Caption</label>
							<span>
								Currently does not support @ mentions (and won't till I figure
								out how mentions work 🙂).
							</span>
						</h5>
						<Input
							isMobile
							autoComplete="off"
							id="caption"
							name="caption"
							value={formik.values.caption}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.caption && formik.errors.caption}
						/>
					</div>
					<div className="form-group">
						<h5>
							<label htmlFor="tags">Tags</label>
							<span>
								Space separated list of words (# can be omitted). Used while
								searching for videos and (eventually) for recommendations.
								<br />
								Example: "#Tag1 Tag2"
							</span>
						</h5>
						<Input
							isMobile
							autoComplete="off"
							id="tags"
							name="tags"
							value={formik.values.tags}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.tags && formik.errors.tags}
						/>
					</div>
					<div className="form-group">
						<h5>
							<label htmlFor="music">Music</label>
							<span>
								TikTok (the real one) identifies music used in the video
								automatically, but no such feature exists here so you gotta type
								it manually 😊. Can also be left blank. <br /> Example: Rick
								Astley - Never gonna give you up
							</span>
						</h5>
						<Input
							isMobile
							autoComplete="off"
							id="music"
							name="music"
							value={formik.values.music}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.music && formik.errors.music}
						/>
					</div>
					<div className="buttons">
						<button
							type="button"
							className="cancel-button"
							onClick={() => navigate(-1)}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="primary-button"
							disabled={
								!formik.dirty || !formik.isValid || !videoFile || isLoading
							}
						>
							{isLoading ? <LoadingSpinner className="spinner" /> : "Post"}
						</button>
					</div>
				</div>
			</form>
		</PageWithNavbar>
	);
}
