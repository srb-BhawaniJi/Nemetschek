import React, { Suspense, useEffect, useRef, useState } from "react";
import { locationsData } from "./data/locations";
import { svgComponents } from "./utils/svgMap";
import { LOCATION_IDS } from "./constants/floorplan";
import Dropdown from "./components/Dropdown";
import { Color, Location, Option, SideMenuItemsProps, SideMenuProps } from "./constants/type";
import { getRandomColors, SHAPE_OPTIONS, shapeMapper } from "./constants/constant";


const SideMenu: React.FC<SideMenuProps> = ({ data, onSelect }) => {
    return (
        <div className="sidemenu">
            {data.map((location) => (
                <SideMenuItems key={location.id} node={location} onSelect={onSelect} />
            ))}
        </div>
    );
};

const SideMenuItems: React.FC<SideMenuItemsProps> = ({ node, onSelect }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="item">
            <div className="item-label" onClick={() => {
                setExpanded(!expanded);
                onSelect(node.children ? null : node);
            }}>
                {node.children && <span className={`caret ${expanded ? "caret-down" : "caret-right"}`}></span>}
                {node.name}
            </div>
            {expanded && node.children && (
                <div className="item-children">
                    {node.children.map((child) => (
                        <SideMenuItems key={child.id} node={child} onSelect={onSelect} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const Implementation: React.FC = () => {
    const [selectedNode, setSelectedNode] = useState<Location | null>(null);
    const [selectedColor, setSelectedColor] = useState<Color>({ label: 'No color', value: 'No color' });
    const [selectedShape, setSelectedShape] = useState<Option>(SHAPE_OPTIONS[0]);
    const [colors, setColors] = useState<Color[]>([
        { label: 'No color', value: 'No color' },
        ...getRandomColors()
    ]);
    const [rotationAngle, setRotationAngle] = useState(0);
    const svgContainerRef = useRef<HTMLDivElement>(null);

    const onToggleClicked = () => {
        setRotationAngle(prev => (prev === 180 ? 0 : 180));
    };


    const SelectedSvg = selectedNode?.floorplan ? svgComponents[selectedNode.floorplan] : null;


    useEffect(() => {
        /**
            * Gets all location IDs and determines which ones should be visible based on the selected shape.
            * Applies visibility settings to elements based on the selected shape.
            * Hides elements that are not in the visibleIds list.
            * Observes the SVG container for changes in the DOM.
            * If new elements are added/removed, it re-applies visibility settings.
        */
        const allIds = [...LOCATION_IDS];
        const visibleIds = selectedShape?.value && selectedShape.value === 'All'
            ? allIds
            : shapeMapper[selectedShape?.value as keyof typeof shapeMapper] || [];


        const applyVisibility = () => {
            allIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.style.display = visibleIds.includes(id) ? 'block' : 'none';
                }
            });
        };

        applyVisibility();

        if (svgContainerRef.current) {
            const observer = new MutationObserver(() => {
                applyVisibility();
            });

            observer.observe(svgContainerRef.current, {
                childList: true,
                subtree: true,
            });

            return () => observer.disconnect();
        }
    }, [selectedShape]);



    return (
        <div className="implementation-wrapper">
            <div className="implementation-header">
                <div className="toggle" onClick={onToggleClicked}>Toggle</div>
                <Dropdown
                    value={selectedColor}
                    onSelect={(select) => setSelectedColor(select as Color)}
                    options={colors}
                />
                <Dropdown
                    value={selectedShape}
                    onSelect={(select) => setSelectedShape(select)}
                    options={SHAPE_OPTIONS}
                />
            </div>
            <div className="implementation-body">
                <SideMenu data={locationsData} onSelect={setSelectedNode} />
                <div className="implementation-content">
                    <span className="title">{selectedNode?.name ?? 'Select location'}</span>
                    <div className="svg-container" ref={svgContainerRef}>
                        <Suspense fallback={<div>Loading SVG...</div>}>
                            {SelectedSvg && (
                                <SelectedSvg
                                    fill={selectedColor.value}
                                    style={{
                                        transform: `${rotationAngle !== 0 ? `rotate(${rotationAngle}deg)` : ''}`,
                                        transformOrigin: 'center',
                                        transition: 'transform 0.5s ease',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        objectFit: 'contain',
                                        maxWidth: 600,
                                        maxHeight: 600,
                                    }}
                                />
                            )}
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};