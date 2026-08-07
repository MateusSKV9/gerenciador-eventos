import { type IconType, type SvgProps, ICONS } from "@/icons/icons";

type IconProps = {
	variant: IconType;
} & SvgProps;

export function Icon({ variant, ...props }: IconProps) {
	const Svg = ICONS[variant];

	return <Svg {...props} />;
}
