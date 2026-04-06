import React from 'react'

function SectionHeader({text}) {
  return (
    <div>
      <h1 style={{ color: "var(--section-header)", fontFamily: "Inter", fontSize: "16px", margin: "16px 0px 5px 0px"}}>{text}</h1>
    </div>
  )
}

export default SectionHeader

