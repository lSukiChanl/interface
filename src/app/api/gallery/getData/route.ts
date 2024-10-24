import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
    const galleryPath = path.join(process.cwd(), 'public', 'gallery');

    try {
        const files = await fs.readdir(galleryPath, { withFileTypes: true });
        const Folders: { Nombre: string, Portada: boolean }[] = [];
        const Files: { Nombre: string, Extension: string }[] = [];

        for (const file of files) {
            if (file.isDirectory()) {
                const folderPath = path.join(galleryPath, file.name);
                const coverPath = path.join(folderPath, 'cover.ico');
                
                let portadaExists = false;
                try {
                    await fs.access(coverPath);
                    portadaExists = true;
                } catch (err) {
                    portadaExists = false;
                }

                Folders.push({
                  Nombre: file.name,
                    Portada: portadaExists,
                });
            }

            if (file.isFile()) {
              Files.push({
                Nombre: file.name,
                Extension: file.name.split('.').pop() ?? '',
              });
            }
        }

        return NextResponse.json({ Folders, Files }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error al leer la carpeta', error: error.message }, { status: 500 });
    }
}
