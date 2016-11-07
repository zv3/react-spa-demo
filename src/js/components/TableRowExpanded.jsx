/* @flow */
import React from 'react'
import MetricsBox from 'js/components/details-box/metrics'
import BuildBox from 'js/components/details-box/build'
import UnitTestBox from 'js/components/details-box/unitTest'
import FunctionalTestBox from 'js/components/details-box/functionalTest'
import ResultsBox from 'js/components/details-box/results'

type Props = {
  item: AppItem
};

const TableRowExpanded = ({ item }: Props) => (
  <div className='item__details'>
    <MetricsBox metrics={item.metrics} />
    <BuildBox build={item.build} />
    <UnitTestBox unitTest={item.unitTest} />
    <FunctionalTestBox functionalTest={item.functionalTest} />
    <ResultsBox item={item} />
  </div>
)

export default TableRowExpanded
