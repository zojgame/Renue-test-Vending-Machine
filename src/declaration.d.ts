declare module "*.png";

declare module "*.png" {
    const path: string;
    export default path;
}

declare module '*.css' {
interface IClassNames {
    [className: string]: string
}
const classNames: IClassNames;
export = classNames;
}