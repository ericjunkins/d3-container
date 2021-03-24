import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { debounce } from "lodash";

function useResize(timeout) {
    const ref = useRef();
    const [ size, setSize ] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if(!ref.current) return;

        // Sets dimensions state after [timeout] ms.
        const resizeHandler = debounce(() => {
            setSize({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight
            });
        }, timeout);
        
        // Initialize the referenced DOM element's dimensions.
        resizeHandler();

        // Add the event listener to the window.
        window.addEventListener('resize', resizeHandler);

        // Remove the event listener upon unmount.
        return () => window.removeEventListener("resize", resizeHandler);
    }, [ ref.current, timeout ]);

    return { containerRef: ref, size };
}

const D3Container = React.forwardRef(({ id, d3Chart, config = {}, data, containerStyle, resizeTimeout = 100 }, ref) => {
    const { containerRef, size } = useResize(resizeTimeout);

    useEffect(() => {
        if (!ref.current){
            // Initial draw of the viz 
            config.id = id;
            config.height = size.height;
            config.width = size.width;
        
            ref.current = d3Chart(config, data);
            ref.current();
        } else {
            // Resize the viz
            ref.current.size(size.width, size.height);
        }
    }, [ size ]);

    // Upon a change of data, propagate the updated data down to the visualization.
    useEffect(() => {
        if(!ref.current) return;
        ref.current.data(data);
    }, [ data ]);

    return (
        <div id={id} ref={containerRef} style={{ height: "100%", width: "100%", ...containerStyle }}>
            <svg width={size.width} height={size.height} />
        </div>
    )
});

export default D3Container;