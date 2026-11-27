import { ClipLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div className="flex justify-center p-10">
      <ClipLoader color="#eab308" size={50} aria-label="Cargando" />
    </div>
  );
}
