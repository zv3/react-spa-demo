import React from 'react';

type Props = {
  percent : number | string,
  bgColor : ?string
};

const ProgressBar = ({ percent, bgColor }: Props) => {
  const styleProp = { width: `${percent}%`, background: bgColor };

  return (
    <div className="progress-bar">
      <div className="progress-bar__offset" style={styleProp} />
    </div>
  );
};

export default ProgressBar;
