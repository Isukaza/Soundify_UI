import React from 'react';

const Sentinel = React.forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div
            ref={ref}
            style={{
                height: '1px',
                marginTop: '10px',
            }}
        />
    );
});

export default Sentinel;