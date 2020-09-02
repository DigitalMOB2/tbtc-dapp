import React from "react"
import PropTypes from "prop-types"

const Peanut = ({ width, height, loading, error }) => {
  return (
    <div
      className={`peanut ${loading ? "loading" : ""} ${error ? "error" : ""}`}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 296 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M268.353 3.17999C268.616 3.17999 268.885 3.18527 269.154 3.19054C281.753 3.59661 292 13.7852 292.48 26.3786C292.733 33.0129 290.344 39.2937 285.75 44.0611C281.157 48.8337 274.976 51.4653 268.353 51.4653C262.699 51.4653 257.199 49.4666 252.869 45.8436C244.11 38.508 239.39 30.3497 228.416 30.3497H227.941C216.961 30.3497 212.247 38.5133 203.487 45.8436C199.158 49.4666 193.662 51.4653 188.004 51.4653C182.382 51.4653 176.908 49.4877 172.589 45.9016C163.724 38.5343 158.951 30.3497 147.982 30.3497H147.677C136.707 30.3497 131.935 38.5291 123.07 45.9016C118.751 49.4877 113.277 51.4653 107.655 51.4653C102.033 51.4653 96.5593 49.4877 92.2402 45.9016C83.3752 38.5343 78.6026 29.4426 67.6335 29.4426H67.3276C56.3585 29.4426 51.5859 38.5343 42.7209 45.9016C38.4018 49.4877 32.9278 51.4653 27.3061 51.4653C20.6824 51.4653 14.507 48.8337 9.90843 44.0611C5.33093 39.2885 2.94198 33.0076 3.19512 26.3786C3.67501 13.7852 13.9217 3.59661 26.5203 3.19054C26.7893 3.17999 27.053 3.17999 27.3219 3.17999C33.1018 3.17999 38.6971 5.2578 43.069 9.02844C51.4013 16.2164 55.6202 24.2956 66.12 24.2956H67.7284C78.7081 24.2956 83.4227 16.132 92.1822 8.80167C96.5118 5.1787 102.007 3.17999 107.666 3.17999C113.287 3.17999 118.761 5.1576 123.08 8.74366C131.945 16.1109 136.718 24.2956 147.687 24.2956H147.993C158.962 24.2956 163.735 16.1162 172.6 8.74366C176.919 5.1576 182.393 3.17999 188.014 3.17999C193.668 3.17999 199.168 5.1787 203.498 8.80167C212.257 16.1373 216.972 24.2956 227.952 24.2956C239.485 24.2956 244.279 16.2164 252.611 9.02844C256.978 5.2578 262.568 3.17999 268.353 3.17999ZM268.353 0C261.808 0 255.48 2.35203 250.528 6.61839C248.54 8.33232 246.778 10.0621 245.08 11.7338C239.749 16.9758 235.535 21.1156 227.946 21.1156C221.006 21.1156 217.098 17.3133 211.688 12.0449C209.784 10.1939 207.817 8.27431 205.533 6.36526C200.629 2.25711 194.406 0 188.009 0C181.644 0 175.453 2.23601 170.564 6.2967C168.238 8.22685 166.24 10.1623 164.304 12.0344C158.851 17.3027 154.912 21.1156 147.993 21.1156H147.687C140.768 21.1156 136.829 17.308 131.376 12.0344C129.44 10.1623 127.442 8.22685 125.116 6.2967C120.222 2.23601 114.026 0 107.666 0C101.269 0 95.0458 2.25711 90.1466 6.35999C87.8631 8.27431 85.896 10.1886 83.9923 12.0397C78.5815 17.308 74.6738 21.1103 67.7337 21.1103H66.1252C59.6967 21.1103 56.1317 17.4715 51.2009 12.4299C49.3446 10.5314 47.425 8.56963 45.152 6.61312C40.1948 2.35203 33.8665 0 27.3219 0C27.0213 0 26.726 0.00527362 26.4254 0.0158209C12.1603 0.474626 0.563578 12.0028 0.0203955 26.2574C-0.26438 33.7617 2.44099 40.8653 7.6355 46.2655C12.8353 51.6657 19.8281 54.64 27.3219 54.64C33.6872 54.64 39.8784 52.404 44.7671 48.3433C47.3406 46.2075 49.5186 43.9925 51.628 41.8515C56.7171 36.6939 60.7356 32.6173 67.3382 32.6173H67.644C74.2519 32.6173 78.2704 36.6939 83.3541 41.8515C85.4636 43.9925 87.6469 46.2022 90.2151 48.3433C95.1038 52.404 101.295 54.64 107.66 54.64C114.026 54.64 120.217 52.404 125.105 48.3433C127.431 46.4131 129.43 44.4777 131.365 42.6056C136.818 37.332 140.758 33.5244 147.677 33.5244H147.982C154.901 33.5244 158.841 37.332 164.294 42.6056C166.229 44.4777 168.228 46.4131 170.553 48.3433C175.442 52.404 181.633 54.64 187.999 54.64C194.396 54.64 200.618 52.3829 205.518 48.28C207.801 46.3657 209.768 44.4513 211.677 42.595C217.088 37.3267 220.996 33.5244 227.936 33.5244H228.41C235.35 33.5244 239.258 37.3267 244.669 42.595C246.573 44.4461 248.54 46.3657 250.829 48.2747C255.728 52.3776 261.951 54.6347 268.347 54.6347C275.841 54.6347 282.834 51.6604 288.034 46.2602C293.228 40.86 295.934 33.7564 295.649 26.2521C295.106 11.9975 283.509 0.474626 269.249 0.0105472C268.949 0.00527362 268.648 0 268.353 0Z"
          fill="black"
        />
      </svg>
    </div>
  )
}

Peanut.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
  error: PropTypes.bool,
}

export default Peanut
