import { motion } from "framer-motion"
import { useState } from "react"
import { getData } from "../util"

const initialHeight = 400
const initialWidth = 400
const handleRadius = 6
const primaryColor = "#ff2222"
const fontSizeSm = 10
const Bezier = () => {
    const [viewBoxDimensions, setViewBoxDimensions] = useState({ viewBoxWidth: initialWidth, viewBoxHeight: initialHeight })
    const [canvasDimensions, setCanvasDimensions] = useState({ canvasHeight: initialHeight, canvasWidth: initialWidth })
    const { viewBoxHeight, viewBoxWidth } = viewBoxDimensions
    const { canvasHeight, canvasWidth } = canvasDimensions
    const point1Initial = { x: 80, y: 80 }
    const point2Initial = { x: canvasWidth - 80, y: canvasHeight - 80 }
    console.log("data", getData())
    const [point1, setPoint1] = useState(point1Initial)
    const [point2, setPoint2] = useState(point2Initial)

    const handleOnMouseDown = (e: MouseEvent, type: "point1" | "point2") => {
        const payload = { x: Math.round(e.clientX), y: Math.round(e.clientY) }
        if (type === "point1") {
            setPoint1(payload)
        }
        else {
            setPoint2(payload)
        }
    }

    const handleDrag = (e: DragEvent, type: "point1" | "point2") => {
        const payload = { x: Math.round(e.x), y: Math.round(e.y) }
        if (type === "point1") {
            setPoint1(payload)
        }
        else {
            setPoint2(payload)
        }
    }
    const midPoint = { x: point2.x, y: point1.y }
    const midPointHandle = <motion.circle
        cx={midPoint.x}
        cy={midPoint.y}
        fill={primaryColor}
        r={handleRadius}
        style={handlerStyle} />
    const midPointText = <text style={{ userSelect: "none" }} x={midPoint.x - fontSizeSm} y={midPoint.y - fontSizeSm} fontSize={fontSizeSm} fill={primaryColor}>{midPoint.x},{midPoint.y}</text>

    return (
        <>
            <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} height={canvasHeight} width={canvasWidth} style={{ backgroundColor: "#111", borderRadius: canvasWidth / 80 }}>
                <path d={`M ${point1.x} ${point1.y} L ${point2.x} ${point2.y}`} stroke={primaryColor} />
                <text style={{ userSelect: "none" }} x={point1.x - fontSizeSm} y={point1.y - fontSizeSm} fontSize={fontSizeSm} fill={primaryColor}>{point1.x},{point1.y}</text>
                <text style={{ userSelect: "none" }} x={point2.x - fontSizeSm} y={point2.y - fontSizeSm} fontSize={fontSizeSm} fill={primaryColor}>{point2.x},{point2.y}</text>
                {midPointHandle}
                {midPointText}
                <motion.circle
                    onMouseMove={(e) => handleOnMouseDown(e as MouseEvent<SVGCircleElement, MouseEvent>, "point1")}
                    onMouseDown={(e) => handleOnMouseDown(e as MouseEvent<SVGCircleElement, MouseEvent>, "point1")}
                    // onDrag={(e) => handleDrag(e as DragEvent, "point1")}
                    cx={point1.x}
                    cy={point1.y}
                    fill={primaryColor}
                    r={handleRadius}
                    style={handlerStyle} />
                <motion.circle drag
                    cx={point2Initial.x}
                    cy={point2Initial.y}
                    onDrag={(e) => handleDrag(e as DragEvent, "point2")}
                    fill={primaryColor}
                    r={handleRadius}
                    style={handlerStyle} />
            </svg>
        </>
    )
}

export default Bezier

const handlerStyle = { cursor: "g" }
//formula
//point1 and point2
// distance = p2-p1
// ratio = 0.1 to 0.9 from p1 to p2
// ratio = percentage/100
// => percentage = ratio*100

//new point = p1 + distance*ratio