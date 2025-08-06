import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import getPaginationRange from "@/utils/getPaginationRange";
import type { Table } from "@tanstack/react-table";

type Props<TData> = {
  table: Table<TData>;
};

const PaginationBtn = <TData,>({ table }: Props<TData>) => {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const goToPage = (page: number) => {
    table.setPageIndex(page);
  };

  const pages = getPaginationRange(currentPage, pageCount);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              table.previousPage();
            }}
            className="cursor-pointer"
          />
        </PaginationItem>
        {pages.map((page, index) => (
          <PaginationItem key={index} className="cursor-pointer">
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(Number(page));
                }}
                isActive={page === currentPage}
              >
                {Number(page) + 1}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              table.nextPage();
            }}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBtn;
