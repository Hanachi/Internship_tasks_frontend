import React from "react";
import { useDfpSlot } from "./DfpSlot";

const AdComponent = () => {
	useDfpSlot({
		path: '/6355419/Travel/Europe/France/Paris',
		size: [100, 100],
		id: 'banner-ad',
	});
	return (
		<div
			id='banner-ad'
			style={{ width: '100px', height: '100px' }}
		/>
	)
};

export default AdComponent;