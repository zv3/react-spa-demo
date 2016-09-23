/* @flow */
import React from 'react';

type Props = {
  build: Object
};

const BuildBox = ({ build }: Props) => {
  const buildDateTime = new Date(build.startTimeTs * 1000).toLocaleString();

  return (
    <div className="details-box__content">
      <div className="details-box__row">
        <div className="details-box__column build__debug">
          <div className="icon icon-bug"></div>
          <div className="label">Debug</div>
        </div>

        <div className="details-box__column build__release">
          <div className="icon icon-rocket"></div>
          <div className="label">Release</div>
        </div>
      </div>
      <div className="build__time">{buildDateTime}</div>
    </div>
  );
};

export default BuildBox;
