import React from "react";

const Logo = () => {
  return (
    <div className="flex justify-center items-center ">
      <svg
  width="120"
  height="24"
  viewBox="0 0 240 48"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
>
  <defs>
    <linearGradient id="qGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#22D3EE"/>
    </linearGradient>
  </defs>


  <text
    x="0"
    y="35"
    font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    font-size="38"
    font-weight="500"
    letter-spacing="-1"
    fill="currentColor"
  >
    As
  </text>

  
  <g transform="translate(46,6)">
    <circle
      cx="16"
      cy="16"
      r="14"
      stroke="url(#qGradient)"
      stroke-width="6.0"
    />
    <path
      d="M22 22 L32 30"
      stroke="url(#qGradient)"
      stroke-width="6.0"
      stroke-linecap="round"
    />
  </g>

  
  <text
    x="81"
    y="35"
    font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    font-size="38"
    font-weight="500"
    letter-spacing="-1"
    fill="currentColor"
  >
    ry
  </text>
</svg>

    </div>
  );
};

export default Logo;
