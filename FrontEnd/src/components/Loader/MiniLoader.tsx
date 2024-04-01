import React from 'react'

const MiniLoader = ({ type, size }: { type: string, size: string }) => {
    return (
        <div className={`spinner-border text-${type}`} style={{ scale: `${size}%` }}></div>
    )
}

export default MiniLoader