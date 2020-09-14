import React from "react";
import { PageConfig, PageConfigItem, Search } from "src";
import { Filters } from "../transactionsPage";
import { Filter, SelectOptions } from "../filter";
import { baseHeadingClasses } from "../transactionsPageClasses";

interface PageHeader {
  onSubmit: (search: string) => void;
  onSubmitFilters: (filters: Filters) => void;
  onClear: () => void;
  search: string;
  appNames: SelectOptions[];
  activeFilters: number;
}

export class TransactionsPageHeader extends React.Component<PageHeader> {
  render() {
    const {
      onSubmit,
      onSubmitFilters,
      onClear,
      search,
      appNames,
      activeFilters,
    } = this.props;
    return (
      <>
        <section className={baseHeadingClasses.wrapper}>
          <h1 className={baseHeadingClasses.tableName}>Transactions</h1>
        </section>
        <PageConfig>
          <PageConfigItem>
            <Search
              onSubmit={onSubmit as any}
              onClear={onClear}
              defaultValue={search}
              placeholder={"Search transactions"}
            />
          </PageConfigItem>
          <PageConfigItem>
            <Filter
              onSubmitFilters={onSubmitFilters}
              appNames={appNames}
              activeFilters={activeFilters}
            />
          </PageConfigItem>
        </PageConfig>
      </>
    );
  }
}
