import * as React from "react";

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, [hasMounted]);
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
};

export { ClientOnly };
