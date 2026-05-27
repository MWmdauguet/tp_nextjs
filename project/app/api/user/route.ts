import path from "path";
import fs from "fs";

const getDataPath = () => {
  const dataDir = path.join(process.cwd(), "lib");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, "user.json");
};

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();

  if (!body.email || !body.password) {
    return Response.json(
      { error: "Email et mot de passe requis" },
      { status: 400 }
    );
  }

  const filePath = getDataPath();
  let users: any[] = [];

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    users = JSON.parse(data);
  } catch {
    users = [];
  }

  const user = users.find((u: any) => u.email === body.email);

  if (!user) {
    return Response.json(
      { error: "Email ou mot de passe invalide 404" },
      { status: 404 }
    );
  }

  if (user.password !== body.password) {
    return Response.json(
      { error: "Email ou mot de passe invalide 403" },
      { status: 403 }
    );
  }

  return Response.json({ user }, { status: 200 });
}