function cb(entries: IntersectionObserverEntry[]) {
	entries.forEach(entry => {
		const vid = entry.target.querySelector("video")!;
		if (entry.isIntersecting) vid.play();
		else if (!vid.paused) vid.pause();
	});
}

const observer = new IntersectionObserver(cb, { threshold: 0.8 });

export default function playOnScroll(cardClassName: string) {
	const cards = document.querySelectorAll("." + cardClassName);
	cards.forEach(card => observer.observe(card));

	return () => {
		cards.forEach(card => observer.unobserve(card));
	};
}
