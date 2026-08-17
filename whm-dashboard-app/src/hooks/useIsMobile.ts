import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint = '(max-width: 767px)'): boolean {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const query = window.matchMedia(breakpoint);
		const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
		setIsMobile(query.matches);
		query.addEventListener('change', onChange);
		return () => query.removeEventListener('change', onChange);
	}, [breakpoint]);

	return isMobile;
}
