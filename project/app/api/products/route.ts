import fs from 'fs';
import path from 'path';

const getDataPath = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, 'product.json');
};

export async function GET() {
  try {
    const filePath = getDataPath();
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);
    return Response.json(products);
  } catch (error) {
    const filePath = path.join(process.cwd(), 'lib', 'product.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);
    return Response.json(products);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filePath = getDataPath();
    
    if (!body.name || body.price === undefined || !body.category) {
      return Response.json({ 
        error: 'Données manquantes: name, price et category sont requis' 
      }, { status: 400 });
    }
    
    let products = [];
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      products = JSON.parse(data);
    } catch (readError) {
      console.error('Erreur lecture fichier:', readError);
      products = [];
    }

    const newId = products.length > 0 ? Math.max(...products.map((p: any) => p.id)) + 1 : 1;

    const newProduct = {
      id: newId,
      name: body.name,
      price: Number(body.price),
      category: body.category,
      badge: body.badge && body.badge.trim() ? body.badge : null
    };

    products.push(newProduct);
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
    } catch (writeError) {
      console.error('Erreur écriture fichier:', writeError);
      return Response.json({ 
        error: 'Impossible d\'écrire dans le fichier des produits' 
      }, { status: 500 });
    }
    
    return Response.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Erreur POST:', error);
    return Response.json({ 
      error: 'Erreur lors de l\'ajout du produit: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const filePath = getDataPath();

    if (!body.id) {
      return Response.json({ error: 'id requis' }, { status: 400 });
    }

    if (!body.name || body.price === undefined || !body.category) {
        return Response.json({ error: 'name, price et category sont requis' }, { status: 400 });
    }

    let products = [];
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      products = JSON.parse(data);
    } catch (readError) {
      console.error('Erreur lecture fichier:', readError);
      products = [];
    }

    const index = products.findIndex((p: any) => p.id === body.id);

    if (index === -1) {
      return Response.json({ error: 'Produit introuvable' }, { status: 404 });
    }

    products[index] = {
      id: body.id,
      name: body.name,
      price: Number(body.price),
      category: body.category,
      badge: body.badge && body.badge.trim() ? body.badge : null
    };

    try {
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
    } catch (writeError) {
      console.error('Erreur écriture fichier:', writeError);
      return Response.json({
        error: 'Impossible d\'écrire dans le fichier des produits'
      }, { status: 500 });
    }

    return Response.json(products[index]);
  } catch (error) {
    console.error('Erreur PUT:', error);
    return Response.json({
      error: 'Erreur lors de la mise à jour: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}