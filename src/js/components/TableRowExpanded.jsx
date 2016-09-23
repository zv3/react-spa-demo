/* @flow */
import React from 'react';
import BoxWrapper from 'js/components/details-box/boxWrapper';
import MetricsBox from 'js/components/details-box/metrics';
import BuildBox from 'js/components/details-box/build';
import UnitTestBox from 'js/components/details-box/unitTest';
import FunctionalTestBox from 'js/components/details-box/functionalTest';

type Props = {
  item: Object
};

const TableRowExpanded = ( { item }: Props ) => (
  <div className="item__details">
    <BoxWrapper title="Metrics" state={item.metrics.state}>
      <MetricsBox metrics={item.metrics} />
    </BoxWrapper>

    <BoxWrapper title="Build" state={item.build.state}>
      <BuildBox build={item.build} />
    </BoxWrapper>

    <BoxWrapper title="Unit Test" state={item.unitTest.state}>
      <UnitTestBox unitTest={item.unitTest} />
    </BoxWrapper>

    <BoxWrapper title="Functional Test" state={item.functionalTest.state}>
      <FunctionalTestBox functionalTest={item.functionalTest} />
    </BoxWrapper>
  </div>
);

export default TableRowExpanded;
