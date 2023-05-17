import { h } from 'preact';
import style from './style.css';
import { useRef, useEffect } from 'preact/hooks';

type ChartProps = {
    width?: number,
    height?: number,
    fillStyle?: string
}

const Chart = ({ 
    width = 120, 
    height = 120, 
    fillStyle = '#f0' 
}: ChartProps) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');

        context.fillStyle = fillStyle;
        context.fillRect(0, 0, width, height);
    }, []);
  
    return <canvas ref={canvasRef} />;
};

export default Chart;