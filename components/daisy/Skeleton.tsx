export interface Props {
  skeletonType: SkeletonType;
}

type SkeletonType = "square" | "circle" | "rectangle";

function SquareSkeleton() {
  return <div className="skeleton w-32 h-32"></div>;
}

function CircleSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-52">
      <div className="flex gap-4 items-center">
        <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="skeleton h-32 w-full"></div>
    </div>
  );
}

function RectangleSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-52">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
}

export default function Skeleton(props: Props) {
  const { skeletonType } = props;

  return (
    <>
      {skeletonType === "square" && <SquareSkeleton />}
      {skeletonType === "circle" && <CircleSkeleton />}
      {skeletonType === "rectangle" && <RectangleSkeleton />}
    </>
  );
}
