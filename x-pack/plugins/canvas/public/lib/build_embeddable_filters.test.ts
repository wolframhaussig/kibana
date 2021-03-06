/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { buildEmbeddableFilters } from './build_embeddable_filters';
import { ExpressionValueFilter } from '../../types';

const columnFilter: ExpressionValueFilter = {
  type: 'filter',
  and: [],
  value: 'filter-value',
  column: 'filter-column',
  filterType: 'exactly',
};

const timeFilter: ExpressionValueFilter = {
  type: 'filter',
  and: [],
  column: 'time-column',
  filterType: 'time',
  from: '2019-06-04T04:00:00.000Z',
  to: '2019-06-05T04:00:00.000Z',
};

describe('buildEmbeddableFilters', () => {
  it('converts all Canvas Filters to ES Filters ', () => {
    const filters = buildEmbeddableFilters([timeFilter, columnFilter, columnFilter]);

    expect(filters.filters).toHaveLength(3);
  });

  it('converts time filter to time range', () => {
    const filters = buildEmbeddableFilters([timeFilter]);

    expect(filters.timeRange!.from).toBe(timeFilter.from);
    expect(filters.timeRange!.to).toBe(timeFilter.to);
  });
});
