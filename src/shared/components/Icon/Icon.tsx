import React from "react";
import { ICONS, IconType, SvgProps } from "../../../icons/icons";

type IconProps = {
	variant: IconType;
} & SvgProps;

export function Icon({ variant, ...props }: IconProps) {
	const Svg = ICONS[variant];

	return <Svg {...props} />;
}
