import { BarLoader, PuffLoader } from 'react-spinners';
interface LoaderProps {
  type?: 'bar' | 'puff';
  full?: boolean;
}

const Loader = ({ type = 'puff', full = false }: LoaderProps) => {
  const loader =
    type === 'bar' ? (
      <BarLoader color="var(--brand-alpha)" />
    ) : (
      <PuffLoader color="var(--brand-alpha)" />
    );

  if (full) {
    return <div className="fixed inset-0 flex items-center justify-center">{loader}</div>;
  }
  return <div className="flex items-center justify-center">{loader}</div>;
};

export default Loader;
