import { ReactNode, useCallback } from "react";
import SwiperType from "swiper";
import {
	Swiper,
	SwiperProps,
	SwiperSlide,
	SwiperSlideProps
} from "swiper/react/swiper-react";
import "swiper/swiper.scss";

import classes from "./swiper.module.scss";
import { joinClasses } from "../../../common/utils";

interface Props {
	containerClassName?: string;
	containerProps?: SwiperProps;
	slideClassName?: string;
	slideProps?: SwiperSlideProps;
	slides: ReactNode[];
}

export default function SwiperComponent({
	containerClassName,
	slideClassName,
	slides,
	containerProps,
	slideProps
}: Props) {
	const handleSlideChange = useCallback((swiper: SwiperType) => {
		const prevVideo = document.querySelector<HTMLVideoElement>(
			"#slide-" + swiper.previousIndex + " video"
		)!;
		const curVideo = document.querySelector<HTMLVideoElement>(
			"#slide-" + swiper.activeIndex + " video"
		)!;

		if (!prevVideo.paused) prevVideo.pause();
		curVideo.play();
	}, []);

	return (
		<Swiper
			direction="vertical"
			className={joinClasses(classes["swiper-container"], containerClassName)}
			onSlideChange={handleSlideChange}
			{...containerProps}
		>
			{slides.map((slide, i) => (
				<SwiperSlide
					key={i}
					className={joinClasses(classes["swiper-slide"], slideClassName)}
					id={"slide-" + i}
					{...slideProps}
				>
					{slide}
				</SwiperSlide>
			))}
		</Swiper>
	);
}
