import { ReactNode } from "react";
import {
	Swiper,
	SwiperProps,
	SwiperSlide,
	SwiperSlideProps
} from "swiper/react";
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
	return (
		<Swiper
			direction="vertical"
			className={joinClasses(classes["swiper-container"], containerClassName)}
			{...containerProps}
		>
			{slides.map((slide, i) => (
				<SwiperSlide
					key={i}
					className={joinClasses(classes["swiper-slide"], slideClassName)}
					{...slideProps}
				>
					{slide}
				</SwiperSlide>
			))}
		</Swiper>
	);
}
