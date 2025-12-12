import { useState } from 'react';

function Panorama360({ imagePath }) {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [rotation, setRotation] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        setRotation(prev => prev + deltaX * 0.5);
        setStartX(e.clientX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="card overflow-hidden relative group cursor-grab active:cursor-grabbing">
            <div className="absolute top-4 left-4 z-10 bg-black/60 text-white px-3 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm">
                🖱️ Drag to explore • 360° View
            </div>

            <div
                className="w-full h-96 overflow-hidden bg-black"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <img
                    src={imagePath}
                    alt="360° Restaurant View"
                    className="h-full object-cover transition-transform duration-100 ease-out select-none"
                    style={{
                        width: '200%',
                        transform: `translateX(${rotation}px)`,
                        userSelect: 'none',
                        pointerEvents: 'none'
                    }}
                    draggable="false"
                />
            </div>

            <div className="p-4 bg-gradient-to-t from-black/40 to-transparent absolute bottom-0 left-0 right-0">
                <p className="text-white text-center text-sm">
                    Experience our restaurant ambiance • Drag left or right to look around
                </p>
            </div>
        </div>
    );
}

export default Panorama360;
