import React, {useEffect, useRef, useState} from "react";
import { debounce } from "lodash";


function useResize(ref, resizeTimeout) {
    const [state, setState] = useState();
    useEffect(()=> {
        const getSize = debounce(()=>{
            if (!ref || !ref.current) {
                return;
            }
            const width = ref.current.offsetWidth;
            const height = ref.current.offsetHeight;

            setState({
                width,
                height
            });
        }, resizeTimeout)

        window.addEventListener('resize', getSize);
        getSize();
        return() => window.removeEventListener("resize", getSize);
    }, [ref, resizeTimeout]);

    return state;
}

const D3Container = ({id, d3Chart, config = {}, data, styles, resizeTimeout=100}) => {
    let chart = useRef(undefined);
    const rootRef = useRef(null)
    const size = useResize(rootRef, resizeTimeout);

    useEffect(() => {
        if (chart.current === undefined && size){
            // Initial draw of the viz 
            config.id = 'd3-' + id
            config.height = size.height;
            config.width = size.width;
        
            chart.current = d3Chart(config, data);
            chart.current();
        } else if (chart.current && size){
            // Resize the viz
            chart.current.size(size.width, size.height)
        }


    }, [config, d3Chart, id, data, size, resizeTimeout])


    return (
        <div id={'d3-' + id} style={{height: "100%", width: "100%", ...styles}} ref={rootRef}>
            {size && (
                <svg width={size.width} height={size.height}> </svg>
            )}
        </div>
    )
}

export default D3Container;