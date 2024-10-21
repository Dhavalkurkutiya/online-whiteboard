"use client";
import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { FilterBar } from "./_components/filter-bar";

interface DashbordPageProps {
    searchParams: {
        search?: string;
        favorites?: string;
    };
};

const DashbordPage = ({
    searchParams,
}: DashbordPageProps) => {
    const { organization } = useOrganization();

    return ( 
        <div className="flex-1 h-[calc(100%-80px)] p-6">
           {!organization ? (
            <EmptyOrg />
           ): (
            <>
              <FilterBar />
              <BoardList
                orgId={organization.id}
                query={searchParams}
              />
            </>
           )}
        </div>
     );
}
 
export default DashbordPage;