import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableFooterRow,
  useSortableTable,
} from "@/components/primitives";

interface ProjectData {
  name: string;
  type: string;
  stars: number;
  forks: number;
  year: number;
}

const sampleData: ProjectData[] = [
  { name: "HashLib", type: "Module", stars: 48, forks: 12, year: 2022 },
  { name: "Highlighter", type: "Plugin", stars: 85, forks: 20, year: 2021 },
  { name: "SmartBone", type: "Module", stars: 120, forks: 34, year: 2023 },
  { name: "WindShake", type: "Module", stars: 95, forks: 28, year: 2022 },
  { name: "BoatTween", type: "Module", stars: 63, forks: 15, year: 2020 },
];

export function TableSection() {
  const { data, getSortProps } = useSortableTable(sampleData, {
    key: "name",
    direction: "asc",
  });

  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Table</h2>
        <p className="mt-1 text-body text-text-secondary">
          Sortable, sticky header, tabular numerals, totals row. Click headers to sort.
        </p>
      </div>

      <div className="overflow-hidden rounded-md border border-[var(--color-border-subtle)]">
        <Table density="comfortable">
          <TableHeader>
            <tr>
              <TableHeaderCell {...getSortProps("name")}>Name</TableHeaderCell>
              <TableHeaderCell {...getSortProps("type")}>Type</TableHeaderCell>
              <TableHeaderCell {...getSortProps("stars")} numeric>
                Stars
              </TableHeaderCell>
              <TableHeaderCell {...getSortProps("forks")} numeric>
                Forks
              </TableHeaderCell>
              <TableHeaderCell {...getSortProps("year")} numeric>
                Year
              </TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell numeric>{row.stars.toLocaleString()}</TableCell>
                <TableCell numeric>{row.forks.toLocaleString()}</TableCell>
                <TableCell numeric>{row.year}</TableCell>
              </TableRow>
            ))}
            <TableFooterRow>
              <TableCell>Total</TableCell>
              <TableCell />
              <TableCell numeric>{sampleData.reduce((s, r) => s + r.stars, 0).toLocaleString()}</TableCell>
              <TableCell numeric>{sampleData.reduce((s, r) => s + r.forks, 0).toLocaleString()}</TableCell>
              <TableCell />
            </TableFooterRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
