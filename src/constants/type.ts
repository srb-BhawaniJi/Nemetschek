import { cssColors } from "./colors";

export type Option = {
    label: string;
    value: string | number;
}

export type Location = {
    id: string;
    name: string;
    floorplan?: string;
    children?: Location[];
}

export type onSelectType = (node: Location | null) => void;

export type SideMenuProps = {
    data: Location[];
    onSelect: onSelectType;
}

export type SideMenuItemsProps = {
    node: Location;
    onSelect: onSelectType;
}

export type Color = {
    label: "No color" | keyof typeof cssColors; 
    value: string;
};