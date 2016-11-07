/* @flow */
import React from 'react'
import BoxWrapper from 'js/components/details-box/boxWrapper'

type Props = {
  build: Object
};

const BuildBox = ({ build }: Props) => {
  const buildDateTime = new Date(build.startTimeTs * 1000).toLocaleString()

  return (
    <BoxWrapper title='Build' state={build.state}>
      <div className='details-box__content'>
        <div className='details-box__row'>
          <div className='details-box__column build__debug'>
            <div className='icon icon-tools' />
            <div className='label build__label'>Debug</div>
          </div>

          <div className='details-box__column build__release'>
            <div className='icon icon-package' />
            <div className='label build__label'>Release</div>
          </div>
        </div>
        <div className='build__time'>{buildDateTime}</div>
      </div>
    </BoxWrapper>
  )
}

export default BuildBox
