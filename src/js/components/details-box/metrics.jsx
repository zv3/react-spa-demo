/* @flow */
import { METRIC_STATE_IMPROVED, METRIC_STATE_MAINTAINED, METRIC_STATE_DETERIORATED } from 'js/consts/metricStates';
import React from 'react';
import classNames from 'classnames';
import BoxWrapper from 'js/components/details-box/boxWrapper';

const metricsItemClasses = (state: string = METRIC_STATE_DETERIORATED) => (
  classNames({
    'metrics__arrow'               : true,
    'metrics__arrow--deteriorated' : state === METRIC_STATE_DETERIORATED,
    'metrics__arrow--improved'     : state === METRIC_STATE_IMPROVED,
    'metrics__arrow--maintained'   : state === METRIC_STATE_MAINTAINED
  })
);

type Props = {
  metrics: Object
};

const MetricsBox = ({ metrics }: Props) => (
  <BoxWrapper title="Metrics" state={metrics.state}>
    <div className="details-box__content">
      <div className="details-box__row">
        <dl className="details-box__column">
          <dd className={metricsItemClasses(metrics.test.state)}><span>{metrics.test.score}</span></dd>
          <dt>Test</dt>
        </dl>

        <dl className="details-box__column">
          <dd className={metricsItemClasses(metrics.maintainability.state)}><span>{metrics.maintainability.score}</span></dd>
          <dt>Maintainability</dt>
        </dl>
      </div>

      <div className="details-box__row">
        <dl className="details-box__column">
          <dd className={metricsItemClasses(metrics.security.state)}><span>{metrics.security.score}</span></dd>
          <dt>Security</dt>
        </dl>

        <dl className="details-box__column">
          <dd className={metricsItemClasses(metrics.workmanship.state)}><span>{metrics.workmanship.score}</span></dd>
          <dt>Workmanship</dt>
        </dl>
      </div>
    </div>
  </BoxWrapper>
);

export default MetricsBox;
