import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const PurchasedCourseLoading = () => {
    return (
        <>
            {/* PURCHASED COURSE LIST TABLE */}
            <Table className="hidden md:table">
                <TableHeader>
                    <TableRow>
                        <TableHead className="h-[35px] w-[150px] rounded-sm">
                            <span className="bg-primary-text/20 my-8 block h-[20px] w-[250px] animate-pulse rounded-sm" />
                        </TableHead>

                        <TableHead className="h-[35px] w-[150px] rounded-sm text-center">
                            <span className="bg-primary-text/20 my-8 block h-[20px] w-[180px] animate-pulse rounded-sm lg:w-[200px]" />
                        </TableHead>

                        <TableHead className="h-[35px] w-[150px] rounded-sm text-center">
                            <span className="bg-primary-text/20 my-8 block h-[20px] w-[100px] animate-pulse rounded-sm lg:w-[200px]" />
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="h-[60px] w-[150px] rounded-sm">
                                <span className="bg-primary-text/20 block h-[20px] w-[200px] animate-pulse rounded-sm lg:w-[350px]" />
                            </TableCell>
                            <TableCell className="h-[60px] w-[150px] rounded-sm">
                                <span className="bg-primary-text/20 block h-[20px] w-[120px] animate-pulse rounded-sm lg:w-[150px]" />
                            </TableCell>
                            <TableCell className="h-[60px] w-[150px] rounded-sm">
                                <span className="bg-primary-text/20 block h-[20px] w-[100px] animate-pulse rounded-sm lg:w-[150px]" />
                            </TableCell>
                            <TableCell className="h-[60px] w-[150px] rounded-sm">
                                <span className="bg-primary-text/20 block h-[20px] w-[100px] animate-pulse rounded-sm" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* PURCHASED COURSE LIST CARD */}
            <div className="mid:gap-8 flex flex-col gap-4 md:hidden">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="flex cursor-pointer items-center justify-between py-2"
                    >
                        <div className="flex flex-1 flex-col gap-4">
                            <span className="bg-primary-text/20 mid:w-[220px] h-[25px] w-[150px] animate-pulse rounded-sm" />
                            <span className="bg-primary-text/20 mid:w-[130px] h-[15px] w-[100px] animate-pulse rounded-sm" />
                            <span className="bg-primary-text/20 mid:w-[130px] h-[15px] w-[80px] animate-pulse rounded-sm" />
                        </div>
                        <span className="bg-primary-text/20 mid: h-[20px] w-[70px] animate-pulse rounded-sm" />
                    </div>
                ))}
            </div>
        </>
    );
};

export default PurchasedCourseLoading;
