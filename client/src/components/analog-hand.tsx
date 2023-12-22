function AnalogHand({ rotation, w, h, z, color }) {
    return (
        <div className={`absolute w-${w} h-${h} bg-${color} ${z} bottom-1/2 origin-bottom rounded-full`} style={{ transform: `rotate(${rotation}deg)` }}></div>
    );
};

export default AnalogHand;