import EditArticlePage from "@/components/articles/edit-articles-page";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>   // 1️⃣ mark as Promise
};

const Edit = async ({ params }: Props) => {
  const { id } = await params;      // 2️⃣ await, then grab id

  const article = await prisma.articles.findUnique({
    where: { id },                  // 3️⃣ use the resolved value
  });

  if (!article) notFound();

  return <EditArticlePage article={article} />;
};

export default Edit;
