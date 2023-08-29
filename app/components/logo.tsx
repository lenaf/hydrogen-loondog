import clsx from 'clsx';
import React from 'react';

// Tell webpack this JS file uses this image

export default function Logo({
  className,
  height = '50px',
  width = '50px'
}: {
  className?: string;
  height?: string;
  width?: string;
}) {
  return (
    <div style={{ width, height, }} className={className}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%"
        height="100%" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" >
        <g id="Layer_1">
          <path fillRule="evenodd" clipRule="evenodd" d="M860.783,265.694c6.446,32.018-15.304,50.138-16.124,77.812
		c-0.385,12.99,6.738,30.408,10.905,46.375c11.448,43.842,19.407,97.684,21.753,146.477c1.691,35.141-5.148,71.757-10.76,104.064
		c-5.947,34.242-12.262,66.232-37.641,78.705c-15.187,7.468-102.726,16.472-108.711-9.362
		c-5.776-24.923,29.837-50.112,38.945-70.991c12.109-27.749,11.596-83.32-1.325-110.566c-16.073-33.885-71.24-67.964-106.677-26.188
		c-2.231,37.555-0.875,67,1.734,96.759c2.604,29.713,10.399,58.896,8.1,89.274c-2.817,37.202-42.54,47.387-79.537,42.157
		c-71.187-10.06-35.468-97.655-29.014-160.507c4.698-45.751,8.984-116.353-16.21-126.355c-19.465-7.728-53.711,3.492-73.481-6.784
		c-9.612-4.996-23.1-21.652-18.925-39.066c3.902-16.278,38.83-18.059,51.738-32.11c14.568-15.859,19.479-36.133,39.753-46.408
		c7.968-4.04,21.881-6.034,27.833-6.85c10.588-11.826,9.504-31.415,27.071-32.969c33.761-2.985,20.168,50.891,37.831,70.2
		c32.294,5.877,59.746-2.195,86.118-5.121c27.207-3.021,61.88-1.22,80.251-14.507C815.104,314.769,812.672,246.719,860.783,265.694z
		"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M315.842,524.311c14.265-3.262,23.923-15.937,36.048-25.027
		c23.504-17.618,56.431-35.17,102.227-30.739c16.475,1.594,37.887,6.902,45.466,19.769c9.218,15.651,2.07,48.89-5.068,67.393
		c-15.511,40.216-39.862,66.983-62.679,94.851c-28.202,34.442-49.282,53.999-97.32,72.331
		c-39.03,14.895-115.396,26.22-148.725-5.944c-18.969-18.307-26.954-47.845-18.878-88.06c2.006-9.995,3.553-15.761,6.645-25.686
		c3.602-11.564,7.391-21.519,10.325-28.946c10.68-27.031,43.607-54.682,38.417-104.906c-3.733-36.132-45.839-36.883-86.239-42.469
		c-12.833-1.773-50.166-5.46-50.113-18.372c0.045-11.169,30.828-13.847,43.491-17.132c17.068-4.428,34.862-8.265,43.444-15.597
		c22.156-18.929,20.433-55.447,56.941-56.644c28.561-0.937,60.74,23.905,70.902,42.014
		C322.886,400.636,318.952,461.474,315.842,524.311z"/>
        </g>
        <g id="Layer_2">
        </g>
      </svg>
    </div >
  );
}
