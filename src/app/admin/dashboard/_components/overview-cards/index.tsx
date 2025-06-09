import { compactFormat } from "@/core/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const { users, members, sections, units, active_users, new_users } =
    await getOverviewData();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <OverviewCard
        label="Total Users"
        data={{
          ...users,
          value: compactFormat(users.value),
        }}
        Icon={icons.Users}
      />

      <OverviewCard
        label="Company Members"
        data={{
          ...members,
          value: compactFormat(members.value),
        }}
        Icon={icons.Members}
      />

      <OverviewCard
        label="Sections"
        data={{
          ...sections,
          value: compactFormat(sections.value),
        }}
        Icon={icons.Sections}
      />

      <OverviewCard
        label="Units"
        data={{
          ...units,
          value: compactFormat(units.value),
        }}
        Icon={icons.Units}
      />

      <OverviewCard
        label="Active users this month"
        data={{
          ...units,
          value: compactFormat(active_users.value),
        }}
        Icon={icons.ActiveUsers}
      />
      <OverviewCard
        label="New registrations this month"
        data={{
          ...units,
          value: compactFormat(new_users.value),
        }}
        Icon={icons.NewRegistrations}
      />
    </div>
  );
}
