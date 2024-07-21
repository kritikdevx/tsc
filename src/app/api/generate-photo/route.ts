import { NextResponse } from "next/server";
import { generativeSchema } from "~/components/generative-form/schema";
import sharp from "sharp";

export async function POST(req: Request, res: Response) {
  const body = await req.formData();
  const background = body.get("background") as string;
  const photo = body.get("photo") as File;

  const validate = generativeSchema.safeParse({ background, photo });

  if (!validate.success) {
    return NextResponse.json({ body: validate.error }, { status: 400 });
  }

  const backgroundPath = `/public/backgrounds/${background}.png`;
  const actorPath = `/public/actor.png`;

  const photoBuffer = Buffer.from(await photo.arrayBuffer());
  const backgroundBuffer = sharp(backgroundPath).toBuffer();
  const actorBuffer = sharp(actorPath).toBuffer();

  return NextResponse.json({ body }, { status: 200 });
}
