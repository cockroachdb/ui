import { FunctionComponent, SVGProps } from "react";

declare module "*.svg" {
  const _: FunctionComponent<SVGProps<HTMLOrSVGElement>>;
  export = _;
}
