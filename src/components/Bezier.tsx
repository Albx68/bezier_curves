import { useState } from "react"

const initialHeight = 400
const initialWidth = 400
const handleRadius = 6
const primaryColor = "#ff2222"
const Bezier = () => {
    const [viewBoxDimensions, setViewBoxDimensions] = useState({ viewBoxWidth: initialWidth, viewBoxHeight: initialHeight })
    const [canvasDimensions, setCanvasDimensions] = useState({ canvasHeight: initialHeight, canvasWidth: initialWidth })
    const { viewBoxHeight, viewBoxWidth } = viewBoxDimensions
    const { canvasHeight, canvasWidth } = canvasDimensions
    const [point1, setPoint1] = useState({ x: 80, y: 80 })
    const [point2, setPoint2] = useState({ x: canvasWidth - 80, y: canvasHeight - 80 })
    return (
        <>
            <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} height={canvasHeight} width={canvasWidth} style={{ backgroundColor: "#111", borderRadius: canvasWidth / 80 }}>
                <path d={`M ${point1.x} ${point1.y} L ${point2.x} ${point2.y}`} stroke={primaryColor} />
                <circle cx={point1.x} cy={point1.x} fill={primaryColor} r={handleRadius} />
                <circle cx={point2.x} cy={point2.x} fill={primaryColor} r={handleRadius} />
            </svg>
        </>
    )
}

export default Bezier

//formula
//point1 and point2
// distance = p2-p1
// ratio = 0.1 to 0.9 from p1 to p2
// ratio = percentage/100
// => percentage = ratio*100

//new point = p1 + distance*ratio