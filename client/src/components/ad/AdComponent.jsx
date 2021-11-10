import React from "react";
import { useDfpSlot } from "./DfpSlot";

const AdComponent = () => {
	useDfpSlot({
		path: '/6355419/Travel/Europe/France/Paris',
		size: ['fluid'],
		id: 'banner-ad',
	});
	return (
		<div
			id='banner-ad'
		/>
	)
};

export default AdComponent;