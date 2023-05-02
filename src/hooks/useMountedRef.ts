import React from "react";

/**
 * 返回组建的挂载状态，如果还没挂载或者已经卸载，返回false;反之返回true
 */
export const useMountedRef = () => {
	const monutedRef = React.useRef(false);
	React.useEffect(() => {
		monutedRef.current = true;
		return () => {
			monutedRef.current = false;
		};
	}, []);

	return monutedRef;
};
