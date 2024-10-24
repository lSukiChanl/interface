import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Tu Galeria a la Mano',
};

export default function Gallery({children,}: {children: React.ReactNode;}) {
  return (
    <section className="">
        {children}
    </section>
  );
}