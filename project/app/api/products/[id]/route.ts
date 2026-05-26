import fs from 'fs';
import path from 'path';

const getDataPath = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, 'product.json');
};

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json({ error: 'id requis' }, { status: 400 });
    }

    const filePath = getDataPath();
    let products = [];
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      products = JSON.parse(data);
    } catch {
      products = [];
    }

    const product = products.find((p: any) => p.id === Number(id));

    if (!product) {
      return Response.json({ error: 'Produit introuvable' }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    return Response.json({
      error: 'Erreur: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}