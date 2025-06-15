import { Loader2 } from "lucide-react";

type LoaderProps = {
  label: string;
};

const Loader = ({ label }: LoaderProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Loader2 className="h-2 w-2 animate-spin" />
      {label}
    </div>
  );
};

export default Loader;
