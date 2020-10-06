import React from "react";
import { EmptyTable, EmptyTableProps } from "../empty";
import { Anchor } from "../anchor";
import { statementsTable } from "../util";
import magnifyingGlassImg from "../assets/emptyState/magnifying-glass.svg";
import emptyTableResultsImg from "../assets/emptyState/empty-table-results.svg";

export const EmptyTransactionsPlaceholder: React.FC<{
  isEmptySearchResults: boolean;
}> = ({ isEmptySearchResults }) => {
  // TODO (koorosh): Provide appropriate links on Transactions Page documentation
  const footer = (
    <Anchor href={statementsTable} target="_blank">
      Learn more about statements
    </Anchor>
  );

  const emptyPlaceholderProps: EmptyTableProps = isEmptySearchResults
    ? {
        title:
          "No transactions match your search since this page was last cleared",
        icon: magnifyingGlassImg,
        footer,
      }
    : {
        title: "No transactions since this page was last cleared",
        icon: emptyTableResultsImg,
        message:
          "Transactions are cleared every hour by default, or according to your configuration.",
        footer,
      };
  return <EmptyTable {...emptyPlaceholderProps} />;
};
