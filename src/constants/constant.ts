import { cssColors } from "./colors";
import { Option } from "./type";

export const SHAPE_OPTIONS: Option[] = [
    {label: 'All', value: 'All'},
    {label: 'Circle', value: 'Circle'},
    {label: 'Rectangle', value: 'Rectangle'},
    {label: 'Star', value: 'Star'}
]

export const getRandomColors = () => {
    const colorKeys = Object.keys(cssColors) as (keyof typeof cssColors)[];

    return colorKeys.slice(0,10).map((key) => ({
        label: key,
        value: cssColors[key],
    }));
};

export const shapeMapper: Record<string, string[]> = {
    All: [],
    Circle: ['path1585', 'path15851'],
    Rectangle: ['rect1408', 'rect1410', 'rect1412'],
    Star: ['path1529'],
};