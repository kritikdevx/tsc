import { NextResponse } from "next/server";
import sharp from "sharp";
import Jimp from "jimp";

export async function POST(req: Request, res: Response) {
  const body = await req.formData();
  const background = body.get("background") as string;
  const photo = body.get("photo") as File;

  const backgroundPath = `public/backgrounds/${background}.png`;
  const actorPath = `public/actor.png`;

  const photoBuffer = Buffer.from(await photo.arrayBuffer());
  const backgroundBuffer = await sharp(backgroundPath).toBuffer();
  const actorBuffer = await sharp(actorPath).toBuffer();

  // const jimpImage = await Jimp.read(photoBuffer);
  const jimpBackground = await Jimp.read(backgroundBuffer);
  const jimpActor = await Jimp.read(actorBuffer);

  // take background image, then place actor image on top of it at x: 0, y: 0 position
  jimpBackground.composite(jimpActor, 0, 0);

  const buffer = await jimpBackground.getBufferAsync(Jimp.MIME_PNG);

  // write the buffer to file system
  await sharp(buffer).toFile("public/generated.png");

  return NextResponse.json({ body }, { status: 200 });
}
