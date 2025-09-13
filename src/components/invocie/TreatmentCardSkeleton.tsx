import { Skeleton } from "@/components/ui/skeleton";

const TreatmentCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      <div className="flex gap-4">
        <div className="flex flex-col gap-3 flex-1">
          <div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-6 w-32 mb-3" />
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-5 w-28" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
        <Skeleton className="w-16 h-16 rounded-lg" />
      </div>
    </div>
  );
};

export default TreatmentCardSkeleton;