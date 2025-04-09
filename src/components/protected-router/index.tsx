type ProtectedRouterProps = {
  children: React.ReactNode;
  isPublic?: boolean;
};

export default function ProtectedRouter({
  children,
  isPublic
}: ProtectedRouterProps) {
  return children;
}
