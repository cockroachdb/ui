import { FunctionComponent } from "react";
declare type BadgeCase = "none" | "uppercase";
declare type BadgeIntent = "neutral" | "success" | "warning" | "danger";
interface BadgeProps {
    intent?: BadgeIntent;
    transformCase?: BadgeCase;
}
declare const Badge: FunctionComponent<BadgeProps>;
export default Badge;
