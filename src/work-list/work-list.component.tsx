import React, { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styles from "./work-list.scss";
import Overlay from "../components/overlay/overlay.component";
import { useOrdersWorklist } from "../hooks/useOrdersWorklist";
import GroupedOrdersTable from "../common/groupedOrdersTable.component";
import { DataTableSkeleton } from "@carbon/react";
import { WorklistProps } from "../types";

const WorkList: React.FC<WorklistProps> = ({ fulfillerStatus }) => {
  const { t } = useTranslation();

  const { workListEntries, isLoading } = useOrdersWorklist("", fulfillerStatus);

  if (isLoading) {
    return <DataTableSkeleton role="progressbar" />;
  }

  if (workListEntries?.length >= 0) {
    return (
      <>
        <div>
          <div className={styles.headerBtnContainer}></div>
          <GroupedOrdersTable
            orders={workListEntries}
            showActions={true}
            showStatus={true}
            showOrderType={true}
            showStatusFilter={false}
            showDateFilter={true}
            actions={[
              { actionName: "postProcedureResultForm", displayPosition: 1 },
              {
                actionName: "reject-procedure-order-dialog",
                displayPosition: 2,
              },
            ]}
          />
        </div>
        <Overlay />
      </>
    );
  }
};

export default WorkList;
