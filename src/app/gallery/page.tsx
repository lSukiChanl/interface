import GalleryContent from '@/components/GalleryContent';

export default function Gallery() {
  return (
    <section className="">
      <h1>Tu Galería a la Mano</h1>
      {/* Componente cliente que hará el fetch */}
      <GalleryContent />
    </section>
  );
}