"use client";
import { useEffect, useState } from 'react';

export default function GalleryContent() {
  const [data, setData] = useState<{ Folders: string[], Files: string[] }>({ Folders: [], Files: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/gallery/getData');
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando galería...</p>;

  return (
    <div>
      <h2>Contenido de la Galería</h2>
      <div>
        <h3>Carpetas</h3>
        {data.Folders.map((folder) => (
          <div key={folder}>
            <img src={`/gallery/${folder}/cover.ico`} alt={folder} />
            <div>{folder}</div>
          </div>
        ))}
        <h3>Archivos</h3>
        {data.Files.map((file) => (
          <div key={file}>
            <img src={`/gallery/${file}`} alt={file} />
            <div>{file}</div>
          </div>
        ))}
      </div>


    </div>
  );
}