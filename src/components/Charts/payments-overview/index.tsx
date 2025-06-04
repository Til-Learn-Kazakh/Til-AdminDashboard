import { PeriodPicker } from "@/components/period-picker";
import { standardFormat } from "@/core/lib/format-number";
import { cn } from "@/core/lib/utils";
import { getPaymentsOverviewData } from "@/core/services/charts.services";
import { PaymentsOverviewChart } from "./chart";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export async function PaymentsOverview({
  timeFrame = "monthly",
  className,
}: PropsType) {
  const data = await getPaymentsOverviewData(timeFrame);

  return (
    <div
      className={cn(
        "grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          User registrations
        </h2>

        <PeriodPicker defaultValue={timeFrame} sectionKey="payments_overview" />
      </div>

      <PaymentsOverviewChart data={data} />

      <dl className="flex justify-center pt-4">
        <div className="flex flex-col items-center gap-1">
          <dt className="text-xl font-bold text-dark dark:text-white">
            {standardFormat(data.received.reduce((acc, { y }) => acc + y, 0))}
          </dt>
          <dd className="text-muted-foreground text-sm font-medium dark:text-dark-6">
            New Users
          </dd>
        </div>
      </dl>
    </div>
  );
}
