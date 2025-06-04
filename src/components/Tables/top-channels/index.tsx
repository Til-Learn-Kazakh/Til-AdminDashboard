import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { compactFormat } from "@/core/lib/format-number";
import { cn } from "@/core/lib/utils";
import Image from "next/image";
import { getTopSocialChannels } from "../fetch"; // путь к функции выше

export async function TopSocialChannels({ className }: { className?: string }) {
  const data = await getTopSocialChannels();

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Social Performance
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead className="!text-left">Platform</TableHead>
            <TableHead>Followers</TableHead>
            <TableHead>Following</TableHead>
            <TableHead>Messages</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((channel, i) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white"
              key={channel.name + i}
            >
              <TableCell className="flex items-center gap-3 text-left">
                <Image
                  src={channel.logo}
                  alt={channel.name + " logo"}
                  width={40}
                  height={40}
                  className="size-8 rounded-full object-cover"
                />
                <span>{channel.name}</span>
              </TableCell>
              <TableCell>{compactFormat(channel.followers)}</TableCell>
              <TableCell>{compactFormat(channel.following ?? 0)}</TableCell>
              <TableCell>{compactFormat(channel.messages)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
